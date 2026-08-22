(() => {
  "use strict";

  const cfg = window.REPODRIVE_CONFIG || {};
  const API = (cfg.githubApiBase || "https://api.github.com").replace(/\/$/, "");
  const API_VERSION = cfg.githubApiVersion || "2026-03-10";
  const CLIENT_ID = cfg.githubClientId || "";
  const $ = id => document.getElementById(id);

  // DOM Elements
  const els = {
    loginView: $('loginView'),
    appView: $('appView'),
    loginBtn: $('loginBtn'),
    loginHint: $('loginHint'),
    rememberSession: $('rememberSession'),
    account: $('account'),
    logoutBtn: $('logoutBtn'),
    refreshBtn: $('refreshBtn'),
    repoSearch: $('repoSearch'),
    repoList: $('repoList'),
    repoEmpty: $('repoEmpty'),
    newRepoBtn: $('newRepoBtn'),
    branchSelect: $('branchSelect'),
    prefix: $('prefix'),
    encryptToggle: $('encryptToggle'),
    filePicker: $('filePicker'),
    dropZone: $('dropZone'),
    uploadProgress: $('uploadProgress'),
    pendingList: $('pendingList'),
    pendingCount: $('pendingCount'),
    commitMessage: $('commitMessage'),
    commitBtn: $('commitBtn'),
    commitStatus: $('commitStatus'),
    fileSearch: $('fileSearch'),
    fileTree: $('fileTree'),
    fileTreeEmpty: $('fileTreeEmpty'),
    bulkBar: $('bulkBar'),
    bulkCount: $('bulkCount'),
    bulkFolder: $('bulkFolder'),
    bulkMove: $('bulkMove'),
    bulkDelete: $('bulkDelete'),
    themeToggle: $('themeToggle'),
    authDialog: $('authDialog'),
    deviceCode: $('deviceCode'),
    verifyLink: $('verifyLink'),
    copyCode: $('copyCode'),
    deviceStatus: $('deviceStatus'),
    cancelAuth: $('cancelAuth'),
    repoDialog: $('repoDialog'),
    newRepoName: $('newRepoName'),
    newRepoPrivate: $('newRepoPrivate'),
    repoCreateStatus: $('repoCreateStatus'),
    cancelRepo: $('cancelRepo'),
    createRepo: $('createRepo'),
    previewModal: $('previewModal'),
    previewTitle: $('previewTitle'),
    previewContent: $('previewContent'),
    closePreview: $('closePreview'),
    downloadPreview: $('downloadPreview'),
    sharePreview: $('sharePreview'),
    toast: $('toast'),
    selectedPath: $('selectedPath'),
    fileCount: $('fileCount'),
    storageTotal: $('storageTotal'),
    repoCount: $('repoCount')
  };

  // Constants
  const LIMIT_FILE = 50 * 1024 * 1024;
  const LIMIT_BATCH = 150 * 1024 * 1024;
  const DEFAULT_RULES = [
    { pattern: '\\.(jpe?g|png|gif|webp|heic|avif)$', folder: 'Images' },
    { pattern: '\\.(mp4|mkv|mov|webm|avi)$', folder: 'Videos' },
    { pattern: '\\.(mp3|wav|flac|m4a|ogg|aac)$', folder: 'Audio' },
    { pattern: '\\.(pdf|docx?|xlsx?|pptx?|csv|txt|md)$', folder: 'Documents' },
    { pattern: '\\.(zip|7z|rar|tar|gz|bz2)$', folder: 'Archives' },
    { pattern: '\\.(js|jsx|ts|tsx|py|java|c|cpp|h|css|html|json|yml|yaml|sh)$', folder: 'Code' }
  ];

  // State
  let token = null, refreshToken = null, tokenExpiresAt = 0, authAbort = null;
  let me = null, repositories = [], selected = null, treeEntries = [], pending = [], selectedTree = new Set();
  let rules = loadRules();
  let showHiddenFiles = false;
  let currentPreviewFile = null;
  let currentPreviewData = null;
  let previewObjectUrl = null;
  const SESSION_KEY = 'repodrive_session';
  const REMEMBER_KEY = 'repodrive_remember_session';

  function loadRules() {
    try {
      const x = JSON.parse(localStorage.getItem('repodrive_rules') || 'null');
      return Array.isArray(x) && x.length ? x : DEFAULT_RULES.slice();
    } catch { return DEFAULT_RULES.slice(); }
  }

  function saveRules() { localStorage.setItem('repodrive_rules', JSON.stringify(rules)); }

  function toast(msg, type = '') {
    els.toast.textContent = msg;
    els.toast.className = `toast show ${type}`;
    clearTimeout(toast.t);
    toast.t = setTimeout(() => els.toast.classList.remove('show'), 3000);
  }

  function status(msg, type = '') {
    els.commitStatus.textContent = msg;
    els.commitStatus.className = `status ${type}`;
  }

  function configured() { return Boolean(CLIENT_ID && !CLIENT_ID.includes('YOUR_')); }

  function fmt(n) {
    if (!Number.isFinite(n) || n < 0) return '—';
    if (n < 1024) return `${n} B`;
    if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
    if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
    return `${(n / 1024 ** 3).toFixed(2)} GB`;
  }

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  function getFileExtension(path) { return path.split('.').pop().toLowerCase(); }

  function safePath(p) {
    const n = String(p || '').replaceAll('\\', '/').replace(/^\.\//, '');
    if (!n || n.startsWith('/') || n.includes('\0')) return null;
    const parts = n.split('/');
    if (parts.some(x => !x || x === '..')) return null;
    return n;
  }

  function isTextFile(path) {
    const exts = ['txt', 'md', 'json', 'js', 'ts', 'py', 'java', 'c', 'cpp', 'h', 'go', 'rs', 'rb', 'php', 'html', 'css', 'xml', 'yaml', 'yml', 'toml', 'sh', 'bash', 'sql', 'csv', 'log'];
    return exts.includes(getFileExtension(path));
  }

  function isImageFile(path) {
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'avif', 'svg', 'bmp', 'tiff'].includes(getFileExtension(path));
  }

  function isVideoFile(path) {
    return ['mp4', 'mkv', 'mov', 'webm', 'avi', 'm4v'].includes(getFileExtension(path));
  }

  function isAudioFile(path) {
    return ['mp3', 'wav', 'flac', 'm4a', 'aac', 'ogg'].includes(getFileExtension(path));
  }

  // Theme
  function initTheme() {
    const saved = localStorage.getItem('repodrive_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    els.themeToggle.textContent = saved === 'dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('repodrive_theme', next);
    els.themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
  }

  // API
  async function api(path, options = {}, retry = true) {
    if (!token) throw new Error('Session expired. Reconnect.');
    const headers = {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': API_VERSION,
      ...(options.headers || {})
    };
    const res = await fetch(`${API}${path}`, { ...options, headers });
    if (res.status === 401 && retry && refreshToken) {
      if (await refresh()) return api(path, options, false);
    }
    let data = null;
    try { data = await res.json(); } catch {}
    if (!res.ok) {
      const e = new Error(data?.message || `GitHub request failed (${res.status})`);
      e.status = res.status;
      throw e;
    }
    return data;
  }

  async function refresh() {
    if (!refreshToken) return false;
    try {
      const res = await fetch('/api/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: CLIENT_ID, refresh_token: refreshToken })
      });
      const d = await res.json();
      if (!res.ok || !d.access_token) throw new Error('Refresh failed');
      token = d.access_token;
      refreshToken = d.refresh_token || refreshToken;
      tokenExpiresAt = d.expires_in ? Date.now() + d.expires_in * 1000 : 0;
      persistSession();
      return true;
    } catch { clearSession(); return false; }
  }

  function persistSession() {
    if (!els.rememberSession?.checked || !token) return;
    localStorage.setItem(REMEMBER_KEY, '1');
    localStorage.setItem(SESSION_KEY, JSON.stringify({ access_token: token, refresh_token: refreshToken, expires_at: tokenExpiresAt }));
  }

  function clearSession(removeSaved = true) {
    token = null; refreshToken = null; tokenExpiresAt = 0; me = null;
    if (removeSaved) { localStorage.removeItem(SESSION_KEY); localStorage.removeItem(REMEMBER_KEY); }
  }

  async function restoreSavedSession() {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw || localStorage.getItem(REMEMBER_KEY) !== '1') return false;
    try {
      const saved = JSON.parse(raw);
      if (!saved?.access_token) return false;
      token = saved.access_token;
      refreshToken = saved.refresh_token || null;
      tokenExpiresAt = Number(saved.expires_at) || 0;
      if (tokenExpiresAt && Date.now() >= tokenExpiresAt - 30000) {
        if (!(await refresh())) return false;
      }
      await afterLogin();
      return Boolean(token);
    } catch { clearSession(); return false; }
  }

  // Auth
  async function login() {
    if (!configured()) {
      els.loginHint.textContent = 'Setup required: add GitHub App Client ID to config.js';
      return;
    }
    authAbort = new AbortController();
    els.loginBtn.disabled = true;
    els.deviceStatus.textContent = 'Requesting code…';
    els.authDialog.showModal();
    try {
      const res = await fetch('/api/device-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: CLIENT_ID }),
        signal: authAbort.signal
      });
      const d = await res.json();
      if (!res.ok || !d.device_code) throw new Error(d.error_description || 'Could not start GitHub authorization.');
      els.deviceCode.textContent = d.user_code;
      els.verifyLink.href = d.verification_uri || 'https://github.com/login/device';
      els.deviceStatus.textContent = 'Waiting for approval…';
      const deadline = Date.now() + (d.expires_in || 900) * 1000;
      let interval = Math.max(5000, (d.interval || 5) * 1000);
      while (Date.now() < deadline) {
        await new Promise(r => setTimeout(r, interval));
        if (authAbort.signal.aborted) throw new DOMException('Aborted', 'AbortError');
        const t = await fetch('/api/poll-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ client_id: CLIENT_ID, device_code: d.device_code }),
          signal: authAbort.signal
        });
        const x = await t.json();
        if (x.access_token) {
          token = x.access_token;
          refreshToken = x.refresh_token || null;
          tokenExpiresAt = x.expires_in ? Date.now() + x.expires_in * 1000 : 0;
          persistSession();
          els.authDialog.close();
          await afterLogin();
          return;
        }
        if (x.error === 'authorization_pending') continue;
        if (x.error === 'slow_down') { interval += 5000; continue; }
        throw new Error(x.error_description || x.error || 'Authorization failed.');
      }
      throw new Error('Code expired. Try again.');
    } catch (e) {
      if (e.name !== 'AbortError') {
        if (els.authDialog.open) els.authDialog.close();
        els.loginHint.textContent = e.message;
        toast(e.message, 'error');
      }
    } finally {
      els.loginBtn.disabled = false;
      authAbort = null;
    }
  }

  async function afterLogin() {
    try {
      me = await api('/user');
      els.account.textContent = `@${me.login}`;
      els.logoutBtn.classList.remove('hidden');
      els.refreshBtn.classList.remove('hidden');
      els.loginView.classList.add('hidden');
      els.appView.classList.remove('hidden');
      await loadRepos();
      initTheme();
    } catch (e) {
      toast(e.message, 'error');
      clearSession();
      els.appView.classList.add('hidden');
      els.loginView.classList.remove('hidden');
    }
  }

  // Repositories
  async function loadRepos() {
    els.repoList.innerHTML = '<div class="empty">Loading…</div>';
    try {
      const map = new Map();
      const installations = [];
      for (let page = 1; page <= 10; page++) {
        const d = await api(`/user/installations?per_page=100&page=${page}`);
        installations.push(...(d.installations || []));
        if ((d.installations || []).length < 100) break;
      }
      for (const inst of installations) {
        for (let page = 1; page <= 10; page++) {
          const d = await api(`/user/installations/${inst.id}/repositories?per_page=100&page=${page}`);
          for (const r of (d.repositories || [])) map.set(r.id, normalizeRepo(r, inst));
          if ((d.repositories || []).length < 100) break;
        }
      }
      for (let page = 1; page <= 10; page++) {
        const d = await api(`/user/repos?per_page=100&page=${page}&sort=updated&affiliation=owner,collaborator,organization_member`);
        for (const r of (d || [])) {
          const n = normalizeRepo(r);
          const prev = map.get(r.id);
          map.set(r.id, { ...prev, ...n });
        }
        if ((d || []).length < 100) break;
      }
      repositories = [...map.values()].sort((a, b) => new Date(b.updated) - new Date(a.updated) || a.full_name.localeCompare(b.full_name));
      els.repoCount.textContent = repositories.length;
      renderRepos();
      if (!repositories.length) {
        els.repoEmpty.classList.remove('hidden');
        els.repoList.innerHTML = '';
      }
    } catch (e) {
      els.repoList.innerHTML = '';
      els.repoEmpty.textContent = e.message;
      els.repoEmpty.classList.remove('hidden');
    }
  }

  function normalizeRepo(r, inst) {
    return {
      id: r.id, name: r.name, full_name: r.full_name || `${r.owner?.login}/${r.name}`,
      owner: r.owner?.login || '', private: !!r.private, default_branch: r.default_branch || 'main',
      sizeKB: Number(r.size) || 0, updated: r.updated_at || '', html_url: r.html_url || `https://github.com/${r.full_name}`,
      installationId: inst?.id || null
    };
  }

  function renderRepos() {
    const q = els.repoSearch.value.trim().toLowerCase();
    let list = repositories.filter(r => r.full_name.toLowerCase().includes(q));
    els.repoList.innerHTML = '';
    els.repoEmpty.classList.toggle('hidden', !!list.length);
    if (!list.length) {
      els.repoEmpty.textContent = q ? 'No matches' : 'No repositories';
      return;
    }
    for (const r of list) {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = `repo-item${selected?.id === r.id ? ' selected' : ''}`;
      row.innerHTML = `
        <div class="repo-name">
          <span class="repo-lock">${r.private ? '🔒' : ''}</span>
          <span>${escapeHtml(r.full_name)}</span>
        </div>
        <div class="repo-meta">${fmt(r.sizeKB * 1024)} · ${escapeHtml(r.default_branch)}</div>
      `;
      row.addEventListener('click', () => selectRepo(r));
      els.repoList.appendChild(row);
    }
  }

  // Select Repository
  async function selectRepo(repo) {
    selected = repo;
    renderRepos();
    els.selectedPath.textContent = repo.full_name;
    els.branchSelect.innerHTML = '<option>Loading…</option>';
    selectedTree.clear();
    await loadBranches();
    await loadTree();
  }

  async function loadBranches() {
    try {
      const branches = await api(`/repos/${encodeURIComponent(selected.owner)}/${encodeURIComponent(selected.name)}/branches?per_page=100`);
      els.branchSelect.innerHTML = '';
      for (const b of branches) {
        const o = document.createElement('option');
        o.value = b.name;
        o.textContent = b.name;
        if (b.name === selected.default_branch) o.selected = true;
        els.branchSelect.appendChild(o);
      }
    } catch (e) {
      els.branchSelect.innerHTML = '<option value="">Error loading branches</option>';
      status(e.message, 'error');
    }
  }

  async function loadTree() {
    if (!selected || !els.branchSelect.value) return;
    els.fileTree.innerHTML = '<div class="empty">Loading…</div>';
    try {
      const d = await api(`/repos/${encodeURIComponent(selected.owner)}/${encodeURIComponent(selected.name)}/git/trees/${encodeURIComponent(els.branchSelect.value)}?recursive=1`);
      treeEntries = (d.tree || []).filter(x => x.type === 'blob').map(x => ({ path: x.path, sha: x.sha, size: Number(x.size) || 0 }));
      const sum = treeEntries.reduce((n, x) => n + x.size, 0);
      els.fileCount.textContent = treeEntries.length;
      els.storageTotal.textContent = fmt(sum);
      renderTree();
    } catch (e) {
      els.fileTree.innerHTML = '';
      els.fileTreeEmpty.classList.remove('hidden');
      status(e.message, 'error');
    }
  }

  // File categorization
  function categoryFor(name) {
    for (const r of rules) {
      try { if (new RegExp(r.pattern, 'i').test(name)) return r.folder; } catch {}
    }
    return 'Other';
  }

  function buildPath(filePath) {
    const raw = safePath(filePath);
    if (!raw) throw new Error(`Invalid path: ${filePath}`);
    const folder = categoryFor(raw.split('/').pop());
    const prefix = els.prefix.value.trim().replace(/^\/+|\/+$/g, '');
    const name = raw.split('/').pop();
    return [prefix, folder, name].filter(Boolean).join('/');
  }

  // File collection
  function collectFiles(list) {
    const seen = new Set();
    const out = [];
    for (const file of Array.from(list)) {
      const raw = safePath(file.webkitRelativePath || file.name);
      if (!raw) throw new Error(`Invalid path: ${file.name}`);
      if (seen.has(raw)) throw new Error(`Duplicate: ${raw}`);
      if (file.size > LIMIT_FILE) throw new Error(`${raw} exceeds 50 MB limit`);
      seen.add(raw);
      out.push({ file, sourcePath: raw, destPath: buildPath(raw) });
    }
    const total = out.reduce((n, x) => n + x.file.size, 0);
    if (total > LIMIT_BATCH) throw new Error(`Batch exceeds 150 MB limit`);
    return out;
  }

  async function addPending(list) {
    try {
      const collected = collectFiles(list);
      pending = [...pending, ...collected];
      const dedupe = new Map(pending.map(x => [x.destPath, x]));
      pending = [...dedupe.values()];
      renderPending();
      status('');
    } catch (e) {
      status(e.message, 'error');
      toast(e.message, 'error');
    }
  }

  function renderPending() {
    if (!pending.length) {
      els.pendingList.className = 'pending-list empty';
      els.pendingList.textContent = 'Select files to upload';
      els.commitBtn.disabled = true;
      els.pendingCount.textContent = '0';
      return;
    }
    els.pendingList.className = 'pending-list';
    els.pendingList.innerHTML = '';
    let total = 0;
    for (let i = 0; i < pending.length; i++) {
      const x = pending[i];
      total += x.file.size;
      const row = document.createElement('div');
      row.className = 'pending-row';
      row.innerHTML = `
        <span class="path">${escapeHtml(x.sourcePath)}</span>
        <span class="dest">→ ${escapeHtml(x.destPath)}</span>
        <span>${fmt(x.file.size)}</span>
        <button class="remove-btn">✕</button>
      `;
      row.querySelector('button').addEventListener('click', () => { pending.splice(i, 1); renderPending(); });
      els.pendingList.appendChild(row);
    }
    els.pendingCount.textContent = pending.length;
    els.commitBtn.disabled = !selected || !els.branchSelect.value;
  }

  // File upload
  async function fileBase64(file) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    let binary = '';
    for (let i = 0; i < bytes.length; i += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    }
    return btoa(binary);
  }

  async function publish() {
    if (!selected || !pending.length) return;
    els.commitBtn.disabled = true;
    const progressBar = document.querySelector('.progress-fill');
    const progressLabel = document.querySelector('.progress-label');
    els.uploadProgress.classList.remove('hidden');

    try {
      const owner = selected.owner, repo = selected.name, branch = els.branchSelect.value;
      status('Reading branch…');
      const ref = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/ref/heads/${encodeURIComponent(branch)}`);
      const head = ref.object.sha;
      const parent = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/commits/${head}`);

      const tree = [];
      for (let i = 0; i < pending.length; i++) {
        const x = pending[i];
        const pct = ((i + 1) / pending.length * 100).toFixed(0);
        progressBar.style.width = pct + '%';
        progressLabel.textContent = `${i+1}/${pending.length}`;
        status(`Uploading ${i+1}/${pending.length}: ${x.destPath}`);
        const blob = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/blobs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: await fileBase64(x.file), encoding: 'base64' })
        });
        tree.push({ path: x.destPath, mode: '100644', type: 'blob', sha: blob.sha });
      }

      status('Committing…');
      const newTree = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/trees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base_tree: parent.tree.sha, tree })
      });

      const message = els.commitMessage.value.trim() || 'Upload via RepoDrive';
      const commit = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/commits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, tree: newTree.sha, parents: [head] })
      });

      const updated = await fetch(`${API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/refs/heads/${encodeURIComponent(branch)}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'X-GitHub-Api-Version': API_VERSION,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sha: commit.sha, force: false })
      });
      if (!updated.ok) throw new Error('Branch update failed');

      pending = [];
      els.filePicker.value = '';
      renderPending();
      progressBar.style.width = '100%';
      progressLabel.textContent = 'Done!';
      setTimeout(() => els.uploadProgress.classList.add('hidden'), 1500);
      status(`✅ ${tree.length} file${tree.length === 1 ? '' : 's'} committed`, 'good');
      toast('✅ Upload complete', 'good');
      await loadRepos();
      await loadTree();
    } catch (e) {
      status(e.message, 'error');
      if (e.status === 401) { clearSession(); location.reload(); }
    } finally {
      els.commitBtn.disabled = !selected || !pending.length;
      setTimeout(() => els.uploadProgress.classList.add('hidden'), 2000);
    }
  }

  // Preview
  async function previewFile(path) {
    if (!selected) return;
    const branch = els.branchSelect?.value || selected.default_branch;
    currentPreviewFile = path;
    currentPreviewData = null;
    if (previewObjectUrl) { URL.revokeObjectURL(previewObjectUrl); previewObjectUrl = null; }
    els.previewTitle.textContent = path;
    els.previewContent.innerHTML = '<div class="empty">Loading…</div>';
    els.previewModal.showModal();

    try {
      const apiPath = String(path).split('/').map(encodeURIComponent).join('/');
      const data = await api(`/repos/${encodeURIComponent(selected.owner)}/${encodeURIComponent(selected.name)}/contents/${apiPath}?ref=${encodeURIComponent(branch)}`);
      currentPreviewData = data;
      const ext = getFileExtension(path);

      if (isTextFile(path)) {
        const content = data.content ? atob(data.content.replace(/\s/g, '')) : await (await fetch(data.download_url)).text();
        els.previewContent.innerHTML = `<pre class="preview-text">${escapeHtml(content)}</pre>`;
        return;
      }

      if (isImageFile(path)) {
        const blob = await (await fetch(data.download_url)).blob();
        previewObjectUrl = URL.createObjectURL(blob);
        els.previewContent.innerHTML = `<img src="${previewObjectUrl}" alt="${escapeHtml(path)}">`;
        return;
      }

      if (isVideoFile(path)) {
        const blob = await (await fetch(data.download_url)).blob();
        previewObjectUrl = URL.createObjectURL(blob);
        els.previewContent.innerHTML = `<video controls src="${previewObjectUrl}"></video>`;
        return;
      }

      if (isAudioFile(path)) {
        const blob = await (await fetch(data.download_url)).blob();
        previewObjectUrl = URL.createObjectURL(blob);
        els.previewContent.innerHTML = `<audio controls src="${previewObjectUrl}"></audio>`;
        return;
      }

      els.previewContent.innerHTML = `
        <div class="preview-info">
          <div style="font-size:42px">📄</div>
          <strong>${escapeHtml(path)}</strong>
          <div class="preview-format">.${escapeHtml(ext)} · ${fmt(data.size || 0)}</div>
          <button class="primary-btn" id="previewDownload">Download</button>
        </div>
      `;
      document.getElementById('previewDownload')?.addEventListener('click', downloadPreviewFile);
    } catch (e) {
      els.previewContent.innerHTML = `<div class="preview-info error">${escapeHtml(e.message)}</div>`;
    }
  }

  async function downloadPreviewFile() {
    if (!currentPreviewData) return;
    try {
      const url = currentPreviewData.download_url;
      if (!url) throw new Error('No download URL');
      const res = await fetch(url);
      const blob = await res.blob();
      const objUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objUrl;
      a.download = (currentPreviewFile || 'download').split('/').pop();
      a.click();
      setTimeout(() => URL.revokeObjectURL(objUrl), 1000);
    } catch (e) { toast('Download failed', 'error'); }
  }

  function closePreview() {
    if (previewObjectUrl) { URL.revokeObjectURL(previewObjectUrl); previewObjectUrl = null; }
    currentPreviewFile = null; currentPreviewData = null;
    if (els.previewModal?.open) els.previewModal.close();
  }

  async function shareFile(path) {
    const url = `https://raw.githubusercontent.com/${selected.owner}/${selected.name}/${els.branchSelect.value}/${path}`;
    try { await navigator.clipboard.writeText(url); toast('Link copied!', 'good'); } 
    catch { toast('Copy failed', 'error'); }
  }

  // Tree render
  function renderTree() {
    const q = els.fileSearch.value.trim().toLowerCase();
    let list = treeEntries.filter(x => {
      if (!showHiddenFiles && x.path.split('/').pop().startsWith('.')) return false;
      return !q || x.path.toLowerCase().includes(q);
    });

    els.fileTree.innerHTML = '';
    if (!list.length) { els.fileTreeEmpty.classList.remove('hidden'); return; }
    els.fileTreeEmpty.classList.add('hidden');

    for (const x of list) {
      const row = document.createElement('div');
      row.className = 'tree-row';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = selectedTree.has(x.path);
      cb.addEventListener('change', () => {
        cb.checked ? selectedTree.add(x.path) : selectedTree.delete(x.path);
        renderBulk();
      });
      const name = document.createElement('span');
      name.className = 'path';
      name.textContent = x.path;
      name.addEventListener('click', () => previewFile(x.path));
      const size = document.createElement('span');
      size.className = 'size';
      size.textContent = fmt(x.size);
      const actions = document.createElement('span');
      actions.className = 'tree-actions';
      actions.innerHTML = `
        <button onclick="window.previewFile('${x.path}')" title="Preview">👁</button>
        <button onclick="window.shareFile('${x.path}')" title="Share">🔗</button>
      `;
      row.append(cb, name, size, actions);
      els.fileTree.appendChild(row);
    }
  }

  function renderBulk() {
    const n = selectedTree.size;
    els.bulkBar.classList.toggle('hidden', n === 0);
    els.bulkCount.textContent = `${n} selected`;
  }

  // Create repo
  async function createRepo() {
    const name = els.newRepoName.value.trim();
    if (!/^[A-Za-z0-9._-]{1,100}$/.test(name)) {
      els.repoCreateStatus.textContent = 'Invalid name';
      return;
    }
    els.createRepo.disabled = true;
    els.repoCreateStatus.textContent = 'Creating…';
    try {
      const r = await api('/user/repos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, private: els.newRepoPrivate.checked, auto_init: true })
      });
      els.repoDialog.close();
      toast(`Created ${r.full_name}`, 'good');
      await loadRepos();
      const found = repositories.find(x => x.id === r.id);
      if (found) await selectRepo(found);
    } catch (e) {
      els.repoCreateStatus.textContent = e.message;
    } finally {
      els.createRepo.disabled = false;
    }
  }

  // Bulk operations
  async function mutateTree(mode) {
    if (!selected || !selectedTree.size) return;
    const branch = els.branchSelect.value;
    els.bulkMove.disabled = true; els.bulkDelete.disabled = true;

    try {
      const owner = selected.owner, repo = selected.name;
      const ref = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/ref/heads/${encodeURIComponent(branch)}`);
      const head = ref.object.sha;
      const parent = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/commits/${head}`);
      const all = new Set(selectedTree);
      const tree = [...all].map(path => ({ path, mode: '100644', type: 'blob', sha: null }));

      const newTree = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/trees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base_tree: parent.tree.sha, tree })
      });

      const commit = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/commits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: mode === 'delete' ? `Delete ${all.size} files` : `Move ${all.size} files`,
          tree: newTree.sha,
          parents: [head]
        })
      });

      await fetch(`${API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/refs/heads/${encodeURIComponent(branch)}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'X-GitHub-Api-Version': API_VERSION,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sha: commit.sha, force: false })
      });

      selectedTree.clear();
      status(`✅ ${all.size} files ${mode === 'delete' ? 'deleted' : 'moved'}`, 'good');
      toast('Done', 'good');
      await loadTree();
    } catch (e) { status(e.message, 'error'); } finally {
      els.bulkMove.disabled = false; els.bulkDelete.disabled = false;
    }
  }

  // Boot
  async function boot() {
    initTheme();
    els.rememberSession.checked = localStorage.getItem(REMEMBER_KEY) === '1';
    if (!configured()) els.loginHint.textContent = 'Add GitHub App Client ID to config.js';
    if (els.rememberSession.checked) {
      els.loginHint.textContent = 'Restoring session…';
      await restoreSavedSession();
    }
  }

  // Event Listeners
  els.loginBtn.addEventListener('click', login);
  els.cancelAuth.addEventListener('click', () => { authAbort?.abort(); els.authDialog.close(); });
  els.copyCode.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(els.deviceCode.textContent); toast('Copied!', 'good'); } catch { toast('Copy failed', 'error'); }
  });
  els.logoutBtn.addEventListener('click', () => { clearSession(true); location.reload(); });
  els.refreshBtn.addEventListener('click', loadRepos);
  els.repoSearch.addEventListener('input', renderRepos);
  els.newRepoBtn.addEventListener('click', () => { els.repoCreateStatus.textContent = ''; els.repoDialog.showModal(); });
  els.cancelRepo.addEventListener('click', () => els.repoDialog.close());
  els.createRepo.addEventListener('click', createRepo);
  els.branchSelect.addEventListener('change', () => { renderPending(); loadTree(); });
  els.prefix.addEventListener('input', () => { pending = pending.map(x => ({ ...x, destPath: buildPath(x.sourcePath) })); renderPending(); });
  els.filePicker.addEventListener('change', e => addPending(e.target.files));
  els.dropZone.addEventListener('dragover', e => { e.preventDefault(); els.dropZone.classList.add('drag'); });
  els.dropZone.addEventListener('dragleave', e => { e.preventDefault(); els.dropZone.classList.remove('drag'); });
  els.dropZone.addEventListener('drop', e => { e.preventDefault(); els.dropZone.classList.remove('drag'); addPending(e.dataTransfer.files); });
  els.commitBtn.addEventListener('click', publish);
  els.fileSearch.addEventListener('input', renderTree);
  els.themeToggle.addEventListener('click', toggleTheme);
  els.closePreview.addEventListener('click', closePreview);
  els.downloadPreview.addEventListener('click', downloadPreviewFile);
  els.sharePreview.addEventListener('click', () => { if (currentPreviewFile) shareFile(currentPreviewFile); });
  els.bulkDelete.addEventListener('click', () => { if (confirm(`Delete ${selectedTree.size} files?`)) mutateTree('delete'); });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'u') { e.preventDefault(); els.filePicker.click(); }
    if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); els.commitBtn.click(); }
    if (e.ctrlKey && e.key === 'f') { e.preventDefault(); els.fileSearch.focus(); }
    if (e.key === 'Escape') { document.querySelectorAll('dialog[open]').forEach(d => d.close()); }
  });

  // Expose globals
  window.previewFile = previewFile;
  window.shareFile = shareFile;
  window.closePreview = closePreview;

  boot();
})();