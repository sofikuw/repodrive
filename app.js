(() => {
  "use strict";

  const cfg = window.REPODRIVE_CONFIG || {};
  const API = (cfg.githubApiBase || "https://api.github.com").replace(/\/$/, "");
  const API_VERSION = cfg.githubApiVersion || "2026-03-10";
  const CLIENT_ID = cfg.githubClientId || "";
  const APP_SLUG = cfg.githubAppSlug || "";
  const VERSION = cfg.appVersion || "0.2.0";
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
    installBtn: $('installBtn'),
    accessPanel: $('accessPanel'),
    accessTitle: $('accessTitle'),
    accessText: $('accessText'),
    accessManage: $('accessManage'),
    alert: $('alert'),
    repoCount: $('repoCount'),
    privateCount: $('privateCount'),
    storageTotal: $('storageTotal'),
    fileCount: $('fileCount'),
    repoSearch: $('repoSearch'),
    repoSort: $('repoSort'),
    repoList: $('repoList'),
    repoEmpty: $('repoEmpty'),
    reloadReposBtn: $('reloadReposBtn'),
    newRepoBtn: $('newRepoBtn'),
    workspace: $('workspace'),
    selectedRepo: $('selectedRepo'),
    selectedMeta: $('selectedMeta'),
    changeRepoBtn: $('changeRepoBtn'),
    githubRepoLink: $('githubRepoLink'),
    shareRepoBtn: $('shareRepoBtn'),
    watchRepoBtn: $('watchRepoBtn'),
    branchSelect: $('branchSelect'),
    prefix: $('prefix'),
    encryptToggle: $('encryptToggle'),
    ruleCount: $('ruleCount'),
    rulesBtn: $('rulesBtn'),
    suggestRulesBtn: $('suggestRulesBtn'),
    pickFiles: $('pickFiles'),
    pickFolder: $('pickFolder'),
    filePicker: $('filePicker'),
    folderPicker: $('folderPicker'),
    dropZone: $('dropZone'),
    uploadProgress: $('uploadProgress'),
    selectionSummary: $('selectionSummary'),
    clearSelection: $('clearSelection'),
    pendingList: $('pendingList'),
    pendingCount: $('pendingCount'),
    commitMessage: $('commitMessage'),
    commitBtn: $('commitBtn'),
    commitStatus: $('commitStatus'),
    fileSearch: $('fileSearch'),
    refreshTreeBtn: $('refreshTreeBtn'),
    showHidden: $('showHidden'),
    treeSummary: $('treeSummary'),
    treeStorage: $('treeStorage'),
    fileTree: $('fileTree'),
    fileTreeEmpty: $('fileTreeEmpty'),
    bulkBar: $('bulkBar'),
    bulkCount: $('bulkCount'),
    bulkFolder: $('bulkFolder'),
    bulkMove: $('bulkMove'),
    bulkDelete: $('bulkDelete'),
    bulkDownload: $('bulkDownload'),
    bulkShare: $('bulkShare'),
    workspaceTitle: $('workspaceTitle'),
    syncStatus: $('syncStatus'),
    themeToggle: $('themeToggle'),
    globalSearchBar: $('globalSearchBar'),
    globalSearch: $('globalSearch'),
    globalSearchBtn: $('globalSearchBtn'),
    globalSearchExecute: $('globalSearchExecute'),
    viewToggle: $('viewToggle'),
    showFavorites: $('showFavorites'),
    showRecent: $('showRecent'),
    authDialog: $('authDialog'),
    deviceCode: $('deviceCode'),
    verifyLink: $('verifyLink'),
    copyCode: $('copyCode'),
    deviceStatus: $('deviceStatus'),
    cancelAuth: $('cancelAuth'),
    repoDialog: $('repoDialog'),
    newRepoName: $('newRepoName'),
    newRepoDesc: $('newRepoDesc'),
    newRepoPrivate: $('newRepoPrivate'),
    newRepoInit: $('newRepoInit'),
    repoCreateStatus: $('repoCreateStatus'),
    cancelRepo: $('cancelRepo'),
    createRepo: $('createRepo'),
    rulesDialog: $('rulesDialog'),
    rulePattern: $('rulePattern'),
    ruleFolder: $('ruleFolder'),
    addRule: $('addRule'),
    rulesList: $('rulesList'),
    resetRules: $('resetRules'),
    closeRules: $('closeRules'),
    previewModal: $('previewModal'),
    previewTitle: $('previewTitle'),
    previewContent: $('previewContent'),
    closePreview: $('closePreview'),
    closePreviewBtn: $('closePreviewBtn'),
    downloadPreview: $('downloadPreview'),
    sharePreview: $('sharePreview'),
    historyPreview: $('historyPreview'),
    searchResultsModal: $('searchResultsModal'),
    searchResultsList: $('searchResultsList'),
    closeSearchResults: $('closeSearchResults'),
    historyModal: $('historyModal'),
    historyTitle: $('historyTitle'),
    historyList: $('historyList'),
    closeHistory: $('closeHistory'),
    shareModal: $('shareModal'),
    shareContent: $('shareContent'),
    copyShareLink: $('copyShareLink'),
    closeShare: $('closeShare'),
    closeShareBtn: $('closeShareBtn'),
    webdavModal: $('webdavModal'),
    webdavUrl: $('webdavUrl'),
    copyWebdavUrl: $('copyWebdavUrl'),
    closeWebdav: $('closeWebdav'),
    closeWebdavBtn: $('closeWebdavBtn'),
    analyticsModal: $('analyticsModal'),
    analyticsFiles: $('analyticsFiles'),
    analyticsSize: $('analyticsSize'),
    analyticsTypes: $('analyticsTypes'),
    analyticsChanges: $('analyticsChanges'),
    analyticsChart: $('analyticsChart'),
    closeAnalytics: $('closeAnalytics'),
    closeAnalyticsBtn: $('closeAnalyticsBtn'),
    exportRepo: $('exportRepo'),
    setupBackup: $('setupBackup'),
    viewAnalytics: $('viewAnalytics'),
    webdavMount: $('webdavMount'),
    exportPending: $('exportPending'),
    toast: $('toast'),
    driveRepoSearch: $('driveRepoSearch'),
    driveRepoList: $('driveRepoList'),
    driveRepoCount: $('driveRepoCount'),
    driveAvatar: $('driveAvatar'),
    driveUserName: $('driveUserName'),
    driveUserMeta: $('driveUserMeta'),
    driveNewRepo: $('driveNewRepo'),
    driveSignOut: $('driveSignOut'),
    driveBreadcrumbs: $('driveBreadcrumbs'),
    driveMenu: $('driveMenu'),
    driveBack: $('driveBack'),
    driveUp: $('driveUp'),
    driveRefresh: $('driveRefresh'),
    driveUpload: $('driveUpload'),
    driveMore: $('driveMore'),
    driveRepoTitle: $('driveRepoTitle'),
    driveRepoMeta: $('driveRepoMeta'),
    driveOpenGithub: $('driveOpenGithub'),
    driveShareRepo: $('driveShareRepo'),
    driveDropZone: $('driveDropZone'),
    driveFileSearch: $('driveFileSearch'),
    driveSort: $('driveSort'),
    driveSelectAll: $('driveSelectAll'),
    driveFileGrid: $('driveFileGrid'),
    driveEmpty: $('driveEmpty'),
    driveEmptyUpload: $('driveEmptyUpload'),
    drivePathLabel: $('drivePathLabel'),
    driveItemCount: $('driveItemCount'),
    driveStorageStatus: $('driveStorageStatus'),
    driveBranchStatus: $('driveBranchStatus'),
    driveSyncStatus: $('driveSyncStatus')
  };

  // Constants
  const LIMIT_FILE = 50 * 1024 * 1024;
  const LIMIT_BATCH = 150 * 1024 * 1024;
  const DEFAULT_RULES = [
    { pattern: '^IMG[_-].*|\\.(jpe?g|png|gif|webp|heic|avif)$', folder: 'Images' },
    { pattern: '\\.(mp4|mkv|mov|webm|avi)$', folder: 'Videos' },
    { pattern: '\\.(mp3|wav|flac|m4a|ogg|aac)$', folder: 'Audio' },
    { pattern: '\\.(pdf|docx?|xlsx?|pptx?|csv|txt|md)$', folder: 'Documents' },
    { pattern: '\\.(zip|7z|rar|tar|gz|bz2)$', folder: 'Archives' },
    { pattern: '\\.(apk|aab|exe|msi|deb|rpm)$', folder: 'Apps' },
    { pattern: '\\.(js|jsx|ts|tsx|py|java|c|cpp|h|css|html|json|yml|yaml|sh)$', folder: 'Code' }
  ];

  // State
  let token = null, refreshToken = null, tokenExpiresAt = 0, authAbort = null;
  let me = null, repositories = [], selected = null, treeEntries = [], pending = [], selectedTree = new Set();
  let rules = loadRules();
  let favorites = loadFavorites();
  let viewMode = 'list';
  let showHiddenFiles = false;
  let drivePath = '';
  let driveHistory = [];
  let currentPreviewFile = null;
  let currentPreviewData = null;
  let previewObjectUrl = null;
  const SESSION_KEY = 'repodrive_session';
  const REMEMBER_KEY = 'repodrive_remember_session';

  // Utility Functions
  function loadRules() {
    try {
      const x = JSON.parse(localStorage.getItem('repodrive_rules') || 'null');
      return Array.isArray(x) && x.length ? x : DEFAULT_RULES.slice();
    } catch { return DEFAULT_RULES.slice(); }
  }

  function saveRules() {
    localStorage.setItem('repodrive_rules', JSON.stringify(rules));
    renderRules();
    updateRuleCount();
  }

  function loadFavorites() {
    try {
      return JSON.parse(localStorage.getItem('repodrive_favorites') || '{}');
    } catch { return {}; }
  }

  function saveFavorites() {
    localStorage.setItem('repodrive_favorites', JSON.stringify(favorites));
  }

  function updateRuleCount() {
    els.ruleCount.textContent = `${rules.length} rules`;
  }

  function toast(msg, type = '') {
    els.toast.textContent = msg;
    els.toast.className = `toast show ${type}`;
    clearTimeout(toast.t);
    toast.t = setTimeout(() => els.toast.classList.remove('show'), 3500);
  }

  function status(msg, type = '') {
    els.commitStatus.textContent = msg;
    els.commitStatus.className = `status ${type}`;
  }

  function repoAlert(msg = '') {
    if (!msg) {
      els.alert.classList.add('hidden');
      els.alert.textContent = '';
      return;
    }
    els.alert.textContent = msg;
    els.alert.classList.remove('hidden');
  }

  function configured() {
    return Boolean(CLIENT_ID && !CLIENT_ID.includes('YOUR_'));
  }

  function fmt(n) {
    if (!Number.isFinite(n) || n < 0) return '—';
    if (n < 1024) return `${n} B`;
    if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
    if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
    return `${(n / 1024 ** 3).toFixed(2)} GB`;
  }

  function installUrl() {
    return 'https://github.com/settings/installations';
  }

  function safePath(p) {
    const n = String(p || '').replaceAll('\\', '/').replace(/^\.\//, '');
    if (!n || n.startsWith('/') || n.includes('\0')) return null;
    const parts = n.split('/');
    if (parts.some(x => !x || x === '..')) return null;
    return n;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function getFileExtension(path) {
    return path.split('.').pop().toLowerCase();
  }

  const IMAGE_EXTS = ['jpg','jpeg','jpe','png','gif','webp','avif','svg','bmp','ico','tif','tiff','heic','heif','jxl','raw','dng','cr2','cr3','nef','arw','orf','rw2'];
  const VIDEO_EXTS = ['mp4','mkv','mov','webm','avi','wmv','flv','m4v','3gp','3g2','mpeg','mpg','mpe','m2ts','mts','ts','ogv'];
  const AUDIO_EXTS = ['mp3','wav','flac','m4a','aac','ogg','oga','opus','weba','wma','alac','aiff','aif','mid','midi'];
  const TEXT_EXTS = ['txt','md','markdown','mdown','mkd','rst','adoc','json','jsonc','json5','js','mjs','cjs','jsx','ts','tsx','vue','svelte','py','pyw','java','kt','kts','scala','c','cc','cpp','cxx','h','hh','hpp','hxx','cs','go','rs','rb','php','swift','dart','lua','r','pl','pm','sh','bash','zsh','fish','ps1','bat','cmd','html','htm','css','scss','sass','less','xml','xhtml','svg','yaml','yml','toml','ini','cfg','conf','properties','env','gitignore','gitattributes','editorconfig','sql','graphql','gql','proto','log','out','err','csv','tsv','srt','vtt','ass','ssa','sub','m3u','m3u8','pls','lock','map','webmanifest','dockerfile'];
  const OFFICE_EXTS = ['doc','docx','docm','dot','dotx','xls','xlsx','xlsm','xlt','ppt','pptx','pptm','pot','odt','ods','odp','rtf'];
  const ARCHIVE_EXTS = ['zip','7z','rar','tar','gz','tgz','bz2','tbz','xz','txz','zst','lz4','cab','iso','apk','aab'];
  const FONT_EXTS = ['ttf','otf','woff','woff2'];
  const EBOOK_EXTS = ['epub','mobi','azw','azw3','fb2','cbz','cbr'];

  function isImageFile(path) { return IMAGE_EXTS.includes(getFileExtension(path)); }
  function isVideoFile(path) { return VIDEO_EXTS.includes(getFileExtension(path)); }
  function isAudioFile(path) { return AUDIO_EXTS.includes(getFileExtension(path)); }
  function isTextFile(path) {
    const ext = getFileExtension(path);
    const name = String(path).split('/').pop().toLowerCase();
    return TEXT_EXTS.includes(ext) || ['dockerfile','makefile','cmakelists.txt','license','readme'].includes(name);
  }

  // Theme Management
  function initTheme() {
    const MIX_THEME_KEY = 'repodrive_mix_theme_v1';
    const savedTheme = localStorage.getItem(MIX_THEME_KEY) || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    els.themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('repodrive_mix_theme_v1', next);
    els.themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
  }

  // API Functions
  async function api(path, options = {}, retry = true) {
    if (!token) throw new Error('GitHub session expired. Connect again.');
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
      e.data = data;
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
      if (!res.ok || d.error || !d.access_token) throw new Error(d.error_description || d.error || 'GitHub authorization failed.');
      token = d.access_token;
      refreshToken = d.refresh_token || refreshToken;
      tokenExpiresAt = d.expires_in ? Date.now() + d.expires_in * 1000 : 0;
      persistSession();
      return true;
    } catch {
      clearSession();
      return false;
    }
  }

  function persistSession() {
    if (!els.rememberSession?.checked || !token) return;
    localStorage.setItem(REMEMBER_KEY, '1');
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      access_token: token,
      refresh_token: refreshToken,
      expires_at: tokenExpiresAt,
      saved_at: Date.now()
    }));
  }

  function forgetSavedSession() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  }

  function clearSession(removeSaved = true) {
    token = null;
    refreshToken = null;
    tokenExpiresAt = 0;
    me = null;
    if (removeSaved) forgetSavedSession();
  }

  async function restoreSavedSession() {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw || localStorage.getItem(REMEMBER_KEY) !== '1') return false;
    try {
      const saved = JSON.parse(raw);
      if (!saved?.access_token) throw new Error('Invalid saved session');
      token = saved.access_token;
      refreshToken = saved.refresh_token || null;
      tokenExpiresAt = Number(saved.expires_at) || 0;
      if (tokenExpiresAt && Date.now() >= tokenExpiresAt - 30000) {
        if (!(await refresh())) return false;
      }
      await afterLogin();
      return Boolean(token);
    } catch {
      clearSession();
      return false;
    }
  }

  // Authentication
  async function login() {
    if (!configured()) {
      els.loginHint.textContent = 'Setup required: put your GitHub App Client ID in config.js and redeploy.';
      return;
    }
    authAbort = new AbortController();
    els.loginBtn.disabled = true;
    els.deviceStatus.textContent = 'Requesting a one-time code…';
    els.authDialog.showModal();
    try {
      const res = await fetch('/api/device-code', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ client_id: CLIENT_ID }), signal: authAbort.signal });
      let d = {};
      try { d = await res.json(); } catch {}
      if (res.status === 404) throw new Error('RepoDrive API routes are missing from this Vercel deployment. Redeploy the project from the 0.1.5 package root.');
      if (!res.ok || !d.device_code) throw new Error(d.error_description || d.error || 'Could not start GitHub authorization.');
      els.deviceCode.textContent = d.user_code;
      els.verifyLink.href = d.verification_uri || 'https://github.com/login/device';
      els.deviceStatus.textContent = 'Waiting for GitHub approval…';
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
        throw new Error(x.error_description || x.error || 'GitHub authorization failed.');
      }
      throw new Error('The authorization code expired. Start again.');
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
      if (els.driveUserName) els.driveUserName.textContent = me.login;
      if (els.driveAvatar) els.driveAvatar.textContent = (me.login || '?').slice(0,1).toUpperCase();
      els.logoutBtn.classList.remove('hidden');
      els.refreshBtn.classList.remove('hidden');
      els.loginView.classList.add('hidden');
      els.appView.classList.remove('hidden');
      els.workspaceTitle.textContent = `${me.login}'s GitHub workspace`;
      await loadRepos();
      initTheme();
    } catch (e) {
      toast(e.message, 'error');
      clearSession();
      els.appView.classList.add('hidden');
      els.loginView.classList.remove('hidden');
      els.logoutBtn.classList.add('hidden');
      els.refreshBtn.classList.add('hidden');
    }
  }

  // Repository Loading
  async function loadRepos() {
    repoAlert('');
    els.repoList.innerHTML = '<div class="empty">Loading repositories…</div>';
    els.repoEmpty.classList.add('hidden');
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
          const n = normalizeRepo(r), prev = map.get(r.id);
          map.set(r.id, { ...prev, ...n, installationId: prev?.installationId || null, installationAccount: prev?.installationAccount || '', repositorySelection: prev?.repositorySelection || '' });
        }
        if ((d || []).length < 100) break;
      }
      repositories = [...map.values()].sort((a, b) => new Date(b.updated) - new Date(a.updated) || a.full_name.localeCompare(b.full_name));
      renderRepoStats();
      renderRepos();
      renderAccessPanel(installations);
      if (!repositories.length) {
        els.repoEmpty.textContent = installations.length ? 'No repositories are currently granted to this GitHub App installation.' : 'RepoDrive is authorized, but this GitHub App has no accessible installation yet.';
        els.repoEmpty.classList.remove('hidden');
        els.repoList.innerHTML = '';
      }
    } catch (e) {
      els.repoList.innerHTML = '';
      els.repoEmpty.textContent = e.message;
      els.repoEmpty.classList.remove('hidden');
      els.accessPanel.classList.remove('hidden');
      els.accessPanel.classList.add('error-panel');
      els.accessTitle.textContent = 'Could not read GitHub App access';
      els.accessText.textContent = e.status === 403 ? 'GitHub denied the installation/repository listing. Check Metadata: Read and the App installation permissions.' : e.message;
      repoAlert(e.status === 403 ? 'GitHub denied the repository listing. Re-authorize the App after changing permissions, then refresh.' : e.message);
    }
  }

  function normalizeRepo(r, inst) {
    return {
      id: r.id,
      name: r.name,
      full_name: r.full_name || `${r.owner?.login}/${r.name}`,
      owner: r.owner?.login || '',
      private: !!r.private,
      default_branch: r.default_branch || 'main',
      sizeKB: Number(r.size) || 0,
      updated: r.updated_at || '',
      html_url: r.html_url || `https://github.com/${r.full_name}`,
      permissions: r.permissions || {},
      installationId: inst?.id || null,
      installationAccount: inst?.account?.login || '',
      repositorySelection: inst?.repository_selection || ''
    };
  }

  function renderAccessPanel(installations) {
    els.accessPanel.classList.remove('hidden', 'error-panel');
    const privateCount = repositories.filter(r => r.private).length;
    if (!installations.length) {
      els.accessPanel.classList.add('warning-panel');
      els.accessTitle.textContent = 'GitHub App is authorized, but not installed';
      els.accessText.textContent = 'Install RepoDrive on your GitHub account and grant it access to the repositories you want. Private repositories cannot appear before the installation grants access.';
      els.accessManage.href = installUrl();
      return;
    }
    const selected = installations.map(x => x.repository_selection).filter(Boolean);
    const all = selected.filter(x => x === 'all').length;
    els.accessManage.href = installations[0]?.html_url || installUrl();
    if (privateCount === 0 && all === 0) {
      els.accessPanel.classList.add('warning-panel');
      els.accessTitle.textContent = 'Private repositories are not currently visible';
      els.accessText.textContent = 'The App is using selected-repository access. Add your private repositories in GitHub Settings → Applications → Installed GitHub Apps → RepoDrive, then sign out and connect again.';
      return;
    }
    els.accessTitle.textContent = `GitHub App access · ${installations.length} installation${installations.length === 1 ? '' : 's'}`;
    els.accessText.textContent = `RepoDrive can currently see ${repositories.length} repository${repositories.length === 1 ? '' : 'ies'}${privateCount ? ` including ${privateCount} private` : ''}.`;
  }

  function renderRepoStats() {
    els.repoCount.textContent = repositories.length;
    els.privateCount.textContent = repositories.filter(r => r.private).length;
    const kb = repositories.reduce((n, r) => n + r.sizeKB, 0);
    els.storageTotal.textContent = fmt(kb * 1024);
    const fileCount = treeEntries.length;
    els.fileCount.textContent = fileCount || '—';
  }

  function renderRepos() {
    const q = els.repoSearch.value.trim().toLowerCase();
    let list = repositories.filter(r => r.full_name.toLowerCase().includes(q));
    const s = els.repoSort.value;
    list.sort((a, b) => s === 'name' ? a.full_name.localeCompare(b.full_name) : s === 'size' ? b.sizeKB - a.sizeKB : s === 'private' ? Number(b.private) - Number(a.private) || a.full_name.localeCompare(b.full_name) : new Date(b.updated) - new Date(a.updated));
    els.repoList.innerHTML = '';
    els.repoEmpty.classList.toggle('hidden', !!list.length);
    if (!list.length) {
      els.repoEmpty.textContent = q ? 'No repositories match your search.' : 'No repositories available.';
      return;
    }
    for (const r of list) {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = `repo-item${selected?.id === r.id ? ' selected' : ''}`;
      row.innerHTML = `
        <div class="repo-name">
          <span class="repo-lock">${r.private ? '🔒' : '○'}</span>
          <span>${escapeHtml(r.full_name)}</span>
          <span class="badge">${r.private ? 'Private' : 'Public'}</span>
        </div>
        <div class="repo-meta">
          <span>${fmt(r.sizeKB * 1024)} reported</span>
          <span>•</span>
          <span>${escapeHtml(r.default_branch)}</span>
          ${r.repositorySelection ? `<span>•</span><span>${r.repositorySelection === 'all' ? 'All repos' : 'Selected repos'}</span>` : ''}
        </div>
      `;
      row.addEventListener('click', () => selectRepo(r));
      els.repoList.appendChild(row);
    }
    renderDriveRepos();
  }

  // Repository Selection
  async function selectRepo(repo) {
    selected = repo;
    drivePath = '';
    driveHistory = [];
    renderRepos();
    renderDriveLocation();
    els.workspace.classList.remove('hidden');
    els.selectedRepo.textContent = repo.full_name;
    els.selectedMeta.textContent = `${repo.private ? 'Private' : 'Public'} · ${fmt(repo.sizeKB * 1024)} reported by GitHub`;
    els.githubRepoLink.href = repo.html_url;
    els.branchSelect.innerHTML = '<option>Loading branches…</option>';
    selectedTree.clear();
    renderBulk();
    await loadBranches();
    await loadTree();
    window.scrollTo({ top: document.querySelector('.selected-row').offsetTop - 80, behavior: 'smooth' });
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
      if (!branches.length) els.branchSelect.innerHTML = '<option value="">No branches</option>';
    } catch (e) {
      els.branchSelect.innerHTML = '<option value="">Unable to load branches</option>';
      status(e.message, 'error');
    }
  }

  async function loadTree() {
    if (!selected || !els.branchSelect.value) return;
    els.fileTree.innerHTML = '<div class="empty">Loading repository files…</div>';
    try {
      const d = await api(`/repos/${encodeURIComponent(selected.owner)}/${encodeURIComponent(selected.name)}/git/trees/${encodeURIComponent(els.branchSelect.value)}?recursive=1`);
      treeEntries = (d.tree || [])
        .filter(x => x.type === 'blob')
        .map(x => ({ path: x.path, sha: x.sha, size: Number(x.size) || 0 }));
      const sum = treeEntries.reduce((n, x) => n + x.size, 0);
      els.treeSummary.textContent = `${treeEntries.length} files`;
      els.treeStorage.textContent = `Tree size ${fmt(sum)} · GitHub repo size ${fmt(selected.sizeKB * 1024)}`;
      renderTree();
      renderRepoStats();
    } catch (e) {
      els.fileTree.innerHTML = '';
      els.fileTreeEmpty.classList.remove('hidden');
      status(e.message, 'error');
    }
  }

  // File Categorization
  function categoryFor(name) {
    for (const r of rules) {
      try {
        if (new RegExp(r.pattern, 'i').test(name)) return r.folder;
      } catch {}
    }
    return 'Other';
  }

  function buildPath(filePath) {
    const raw = safePath(filePath);
    if (!raw) throw new Error(`Unsafe file path: ${filePath}`);
    const folder = categoryFor(raw.split('/').pop());
    const prefix = els.prefix.value.trim().replace(/^\/+|\/+$/g, '');
    const name = raw.split('/').pop();
    return [prefix, folder, name].filter(Boolean).join('/');
  }

  // File Collection
  function collectFiles(list) {
    const seen = new Set();
    const out = [];
    for (const file of Array.from(list)) {
      const raw = safePath(file.webkitRelativePath || file.name);
      if (!raw) throw new Error(`Invalid path: ${file.name}`);
      if (seen.has(raw)) throw new Error(`Duplicate file: ${raw}`);
      if (file.size > LIMIT_FILE) throw new Error(`${raw} exceeds the 50 MB safety limit.`);
      seen.add(raw);
      out.push({ file, sourcePath: raw, destPath: buildPath(raw) });
    }
    const total = out.reduce((n, x) => n + x.file.size, 0);
    if (total > LIMIT_BATCH) throw new Error(`This batch exceeds the 150 MB safety limit.`);
    return out;
  }

  async function addPending(list) {
    try {
      const collected = collectFiles(list);
      
      // Encrypt files if enabled
      if (els.encryptToggle.checked) {
        const password = sessionStorage.getItem('encryption_password') || prompt('Enter encryption password:');
        if (password) {
          sessionStorage.setItem('encryption_password', password);
          // Files will be encrypted during upload
          toast('Files will be encrypted before upload 🔒', 'good');
        }
      }
      
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
      els.pendingList.textContent = 'Select files to see the planned paths.';
      els.selectionSummary.textContent = 'Nothing selected.';
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
      row.draggable = true;
      row.innerHTML = `
        <span class="path" title="${escapeHtml(x.sourcePath)}">${escapeHtml(x.sourcePath)}</span>
        <span class="dest">→ ${escapeHtml(x.destPath)}</span>
        <span>${fmt(x.file.size)}</span>
        <button class="remove-btn" title="Remove">✕</button>
      `;
      row.querySelector('button').addEventListener('click', () => {
        pending.splice(i, 1);
        renderPending();
      });
      els.pendingList.appendChild(row);
    }
    els.selectionSummary.textContent = `${pending.length} file${pending.length === 1 ? '' : 's'} · ${fmt(total)} · auto-sorted`;
    els.commitBtn.disabled = !selected || !els.branchSelect.value;
    els.pendingCount.textContent = pending.length;
  }

  // File Encryption
  async function encryptFileData(data, password) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: encoder.encode('repodrive-salt'), iterations: 100000, hash: 'SHA-256' },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt']
    );
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    const result = new Uint8Array(iv.length + encrypted.byteLength);
    result.set(iv);
    result.set(new Uint8Array(encrypted), iv.length);
    return result;
  }

  // File Upload
  async function fileBase64(file) {
    let data = await file.arrayBuffer();
    
    // Encrypt if enabled
    if (els.encryptToggle.checked) {
      const password = sessionStorage.getItem('encryption_password');
      if (password) {
        data = await encryptFileData(data, password);
        toast('🔒 Encrypted ' + file.name, 'good');
      }
    }
    
    const bytes = new Uint8Array(data);
    let binary = '';
    for (let i = 0; i < bytes.length; i += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    }
    return btoa(binary);
  }

  async function publish() {
    if (!selected || !pending.length) return;
    els.commitBtn.disabled = true;
    
    // Show progress
    const progressBar = document.querySelector('.progress-fill');
    const progressLabel = document.querySelector('.progress-label');
    els.uploadProgress.classList.remove('hidden');
    
    try {
      const owner = selected.owner, repo = selected.name, branch = els.branchSelect.value;
      status('Reading current branch…');
      const ref = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/ref/heads/${encodeURIComponent(branch)}`);
      const head = ref.object.sha;
      const parent = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/commits/${head}`);
      
      const tree = [];
      for (let i = 0; i < pending.length; i++) {
        const x = pending[i];
        const percent = ((i + 1) / pending.length * 100).toFixed(1);
        progressBar.style.width = percent + '%';
        progressLabel.textContent = `${i+1}/${pending.length} (${percent}%)`;
        status(`Uploading ${i+1}/${pending.length}: ${x.destPath}`);
        
        const blob = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/blobs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: await fileBase64(x.file), encoding: 'base64' })
        });
        tree.push({ path: x.destPath, mode: '100644', type: 'blob', sha: blob.sha });
      }
      
      status('Building atomic tree…');
      const newTree = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/trees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base_tree: parent.tree.sha, tree })
      });
      
      const message = els.commitMessage.value.trim() || 'Save files with RepoDrive';
      const commit = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/commits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, tree: newTree.sha, parents: [head] })
      });
      
      status('Updating branch without force-push…');
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
      const data = await updated.json();
      if (!updated.ok) throw new Error(updated.status === 409 || updated.status === 422 ? 'The branch changed while uploading. Nothing was force-pushed; refresh and retry.' : data?.message || `Could not update branch (${updated.status}).`);
      
      pending = [];
      els.filePicker.value = '';
      els.folderPicker.value = '';
      renderPending();
      progressBar.style.width = '100%';
      progressLabel.textContent = 'Complete!';
      setTimeout(() => els.uploadProgress.classList.add('hidden'), 2000);
      status(`✅ Saved ${tree.length} file${tree.length === 1 ? '' : 's'} in one commit.`, 'good');
      toast('✅ Batch committed to GitHub.', 'good');
      await loadRepos();
      await loadTree();
    } catch (e) {
      status(e.message, 'error');
      if (e.status === 401) { clearSession(); location.reload(); }
    } finally {
      els.commitBtn.disabled = !selected || !pending.length;
      setTimeout(() => els.uploadProgress.classList.add('hidden'), 3000);
    }
  }

  // File Preview
  const PREVIEW_MIME = {
    jpg:'image/jpeg',jpeg:'image/jpeg',jpe:'image/jpeg',png:'image/png',gif:'image/gif',webp:'image/webp',avif:'image/avif',svg:'image/svg+xml',bmp:'image/bmp',ico:'image/x-icon',tif:'image/tiff',tiff:'image/tiff',heic:'image/heic',heif:'image/heif',jxl:'image/jxl',
    mp4:'video/mp4',webm:'video/webm',mov:'video/quicktime',m4v:'video/mp4',ogv:'video/ogg',avi:'video/x-msvideo',mkv:'video/x-matroska',mpeg:'video/mpeg',mpg:'video/mpeg',m2ts:'video/mp2t',mts:'video/mp2t',ts:'video/mp2t',
    mp3:'audio/mpeg',wav:'audio/wav',flac:'audio/flac',m4a:'audio/mp4',aac:'audio/aac',ogg:'audio/ogg',oga:'audio/ogg',opus:'audio/opus',weba:'audio/webm',aiff:'audio/aiff',aif:'audio/aiff',wma:'audio/x-ms-wma',
    pdf:'application/pdf',json:'application/json',csv:'text/csv',tsv:'text/tab-separated-values',txt:'text/plain',md:'text/markdown',markdown:'text/markdown',html:'text/html',htm:'text/html',css:'text/css',js:'text/javascript',mjs:'text/javascript',cjs:'text/javascript',jsx:'text/javascript',ts:'text/typescript',tsx:'text/typescript',xml:'application/xml',xhtml:'application/xhtml+xml',yaml:'text/yaml',yml:'text/yaml',toml:'text/plain',ini:'text/plain',conf:'text/plain',cfg:'text/plain',sh:'text/plain',bash:'text/plain',zsh:'text/plain',fish:'text/plain',ps1:'text/plain',bat:'text/plain',cmd:'text/plain',log:'text/plain',
    py:'text/x-python',java:'text/x-java',kt:'text/x-kotlin',kts:'text/x-kotlin',c:'text/plain',cc:'text/plain',cpp:'text/plain',cxx:'text/plain',h:'text/plain',hpp:'text/plain',cs:'text/plain',go:'text/plain',rs:'text/plain',rb:'text/plain',php:'text/plain',swift:'text/plain',dart:'text/plain',lua:'text/plain',r:'text/plain',sql:'text/plain',graphql:'text/plain',gql:'text/plain',proto:'text/plain',srt:'text/plain',vtt:'text/vtt',ass:'text/plain',ssa:'text/plain',m3u:'audio/x-mpegurl',m3u8:'application/vnd.apple.mpegurl',pls:'audio/x-scpls',svgz:'image/svg+xml'
  };

  function previewMime(path) {
    const ext = getFileExtension(path);
    return PREVIEW_MIME[ext] || 'application/octet-stream';
  }

  function previewCategory(path) {
    const ext = getFileExtension(path);
    if (isImageFile(path)) return 'image';
    if (isVideoFile(path)) return 'video';
    if (isAudioFile(path)) return 'audio';
    if (ext === 'pdf') return 'pdf';
    if (isTextFile(path)) return 'text';
    if (OFFICE_EXTS.includes(ext)) return 'office';
    if (ARCHIVE_EXTS.includes(ext)) return 'archive';
    if (FONT_EXTS.includes(ext)) return 'font';
    if (EBOOK_EXTS.includes(ext)) return 'ebook';
    return 'binary';
  }


  function revokePreviewUrl() {
    if (previewObjectUrl) {
      URL.revokeObjectURL(previewObjectUrl);
      previewObjectUrl = null;
    }
  }

  function base64Blob(content, mime) {
    const clean = String(content || '').replace(/\s/g, '');
    const binary = atob(clean);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], { type: mime });
  }

  async function getPreviewBlob(data, mime) {
    // Small files are normally returned directly by the Contents API.
    if (data?.content && data.encoding === 'base64') return base64Blob(data.content, mime);
    if (!data?.download_url) throw new Error('GitHub did not provide a downloadable file URL.');
    const res = await fetch(data.download_url, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/octet-stream' }
    });
    if (!res.ok) throw new Error(`Could not download preview (${res.status}).`);
    return await res.blob();
  }

  async function previewText(data) {
    if (data?.content && data.encoding === 'base64') {
      const buf = await base64Blob(data.content, 'application/octet-stream').arrayBuffer();
      return new TextDecoder().decode(buf);
    }
    if (!data?.download_url) throw new Error('GitHub did not provide a downloadable file URL.');
    const res = await fetch(data.download_url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Could not download text (${res.status}).`);
    return await res.text();
  }

  function closePreview() {
    revokePreviewUrl();
    currentPreviewFile = null;
    currentPreviewData = null;
    if (els.previewModal?.open) els.previewModal.close();
  }
  async function downloadPreviewFile() {
    if (!currentPreviewData) return;
    try {
      const blob = await getPreviewBlob(currentPreviewData, previewMime(currentPreviewFile || 'file.bin'));
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = (currentPreviewFile || 'download').split('/').pop();
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      toast('Download failed: ' + e.message, 'error');
    }
  }


  function renderCsvTable(text, delimiter = ',') {
    const rows = [];
    let row = [], cell = '', quoted = false;
    for (let i = 0; i < text.length && rows.length < 500; i++) {
      const ch = text[i], next = text[i + 1];
      if (ch === '"' && quoted && next === '"') { cell += '"'; i++; continue; }
      if (ch === '"') { quoted = !quoted; continue; }
      if (!quoted && ch === delimiter) { row.push(cell); cell=''; continue; }
      if (!quoted && (ch === '\n' || ch === '\r')) { if (ch==='\r' && next==='\n') i++; row.push(cell); cell=''; rows.push(row); row=[]; continue; }
      cell += ch;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    if (!rows.length) return '<div class="preview-info">Empty table</div>';
    const head = rows[0], body = rows.slice(1, 201);
    return `<div class="preview-table-wrap"><table class="preview-table"><thead><tr>${head.map(x=>`<th>${escapeHtml(x)}</th>`).join('')}</tr></thead><tbody>${body.map(r=>`<tr>${head.map((_,i)=>`<td>${escapeHtml(r[i] ?? '')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  function renderMarkdown(text) {
    let safe = escapeHtml(text);
    safe = safe.replace(/^###### (.*)$/gm,'<h6>$1</h6>').replace(/^##### (.*)$/gm,'<h5>$1</h5>').replace(/^#### (.*)$/gm,'<h4>$1</h4>').replace(/^### (.*)$/gm,'<h3>$1</h3>').replace(/^## (.*)$/gm,'<h2>$1</h2>').replace(/^# (.*)$/gm,'<h1>$1</h1>');
    safe = safe.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/`([^`]+)`/g,'<code>$1</code>');
    safe = safe.replace(/^> (.*)$/gm,'<blockquote>$1</blockquote>').replace(/^- (.*)$/gm,'<li>$1</li>');
    safe = safe.replace(/\n{2,}/g,'</p><p>').replace(/\n/g,'<br>');
    return `<div class="markdown-render"><p>${safe}</p></div>`;
  }

  async function previewFile(path) {
    if (!selected) return;
    const branch = els.branchSelect?.value || selected.default_branch || 'main';
    currentPreviewFile = path;
    currentPreviewData = null;
    revokePreviewUrl();
    els.previewTitle.textContent = path;
    els.previewContent.innerHTML = '<div class="preview-loading"><span class="mix-spinner"></span> Loading…</div>';
    els.previewModal.showModal();

    try {
      const apiPath = String(path).split('/').map(encodeURIComponent).join('/');
      const data = await api(`/repos/${encodeURIComponent(selected.owner)}/${encodeURIComponent(selected.name)}/contents/${apiPath}?ref=${encodeURIComponent(branch)}`);
      currentPreviewData = data;
      const ext = getFileExtension(path);
      const category = previewCategory(path);
      const mime = previewMime(path);

      if (category === 'text') {
        const content = await previewText(data);
        if (['csv','tsv'].includes(ext)) {
          els.previewContent.innerHTML = renderCsvTable(content, ext === 'tsv' ? '\t' : ',');
        } else if (['json','jsonc','json5'].includes(ext)) {
          let formatted = content; try { formatted = JSON.stringify(JSON.parse(content), null, 2); } catch {}
          els.previewContent.innerHTML = `<pre class="preview-text code-${ext}">${escapeHtml(formatted)}</pre>`;
        } else if (['md','markdown'].includes(ext)) {
          els.previewContent.innerHTML = renderMarkdown(content);
        } else if (['html','htm','svg','xhtml'].includes(ext)) {
          els.previewContent.innerHTML = `<div class="preview-source-label">Source preview · ${escapeHtml(mime)}</div><pre class="preview-text code-${ext}">${escapeHtml(content)}</pre>`;
        } else {
          els.previewContent.innerHTML = `<div class="preview-source-label">${escapeHtml(ext || 'text')} · ${fmt(data.size || content.length)}</div><pre class="preview-text code-${ext}">${escapeHtml(content)}</pre>`;
        }
        return;
      }

      if (category === 'image') {
        const blob = await getPreviewBlob(data, mime);
        previewObjectUrl = URL.createObjectURL(blob);
        els.previewContent.innerHTML = `<div class="preview-media image-preview"><img src="${previewObjectUrl}" alt="${escapeHtml(path)}"></div>`;
        return;
      }

      if (category === 'video') {
        const blob = await getPreviewBlob(data, mime);
        previewObjectUrl = URL.createObjectURL(blob);
        els.previewContent.innerHTML = `<div class="preview-media video-preview"><video controls playsinline preload="metadata" src="${previewObjectUrl}"></video><div class="media-note">If this codec is not supported by your browser, download the file to play it.</div></div>`;
        return;
      }

      if (category === 'audio') {
        const blob = await getPreviewBlob(data, mime);
        previewObjectUrl = URL.createObjectURL(blob);
        els.previewContent.innerHTML = `<div class="preview-media audio-preview"><div class="audio-art">♫</div><strong>${escapeHtml(path.split('/').pop())}</strong><audio controls preload="metadata" src="${previewObjectUrl}"></audio><div class="media-note">Browser codec support varies by format.</div></div>`;
        return;
      }

      if (category === 'pdf') {
        const blob = await getPreviewBlob(data, mime);
        previewObjectUrl = URL.createObjectURL(blob);
        els.previewContent.innerHTML = `<iframe src="${previewObjectUrl}" title="PDF preview"></iframe>`;
        return;
      }

      if (category === 'font') {
        const blob = await getPreviewBlob(data, mime);
        const fontUrl = URL.createObjectURL(blob);
        const family = `RepoPreview_${Date.now()}`;
        try {
          const font = new FontFace(family, `url(${fontUrl})`);
          await font.load(); document.fonts.add(font);
          els.previewContent.innerHTML = `<div class="font-preview" style="font-family:'${family}'"><div class="preview-format">${escapeHtml(ext.toUpperCase())} font preview</div><div class="font-sample">Aa Bb Cc 0123</div><div class="font-sample small">The quick brown fox jumps over the lazy dog.</div></div>`;
          previewObjectUrl = fontUrl;
        } catch {
          URL.revokeObjectURL(fontUrl);
          els.previewContent.innerHTML = `<div class="preview-info"><strong>Font preview unavailable</strong><div class="preview-format">${escapeHtml(ext.toUpperCase())} · download to inspect this font.</div></div>`;
        }
        return;
      }

      if (category === 'archive') {
        const size = fmt(data.size || 0);
        els.previewContent.innerHTML = `<div class="preview-info"><div class="preview-big-icon">${driveFileIcon(path)}</div><strong>${escapeHtml(path.split('/').pop())}</strong><div class="preview-format">${escapeHtml(ext.toUpperCase())} archive · ${size}</div><p>Archive browsing depends on the archive codec. RepoDrive keeps the original archive intact and provides a direct download.</p><div class="preview-actions"><button class="primary-btn" data-preview-download>Download archive</button></div></div>`;
        els.previewContent.querySelector('[data-preview-download]')?.addEventListener('click', downloadPreviewFile);
        return;
      }

      if (category === 'office') {
        els.previewContent.innerHTML = `<div class="preview-info"><div class="preview-big-icon">${driveFileIcon(path)}</div><strong>${escapeHtml(path.split('/').pop())}</strong><div class="preview-format">${escapeHtml(ext.toUpperCase())} document</div><p>Office/OpenDocument files are preserved exactly. A browser-side renderer is not forced on private GitHub files, so the file can be downloaded safely for opening in the native editor.</p><div class="preview-actions"><button class="primary-btn" data-preview-download>Download document</button></div></div>`;
        els.previewContent.querySelector('[data-preview-download]')?.addEventListener('click', downloadPreviewFile);
        return;
      }

      if (category === 'ebook') {
        els.previewContent.innerHTML = `<div class="preview-info"><div class="preview-big-icon">📖</div><strong>${escapeHtml(path.split('/').pop())}</strong><div class="preview-format">${escapeHtml(ext.toUpperCase())} e-book</div><p>eBook reading requires a dedicated browser reader. The original file remains available without conversion.</p><div class="preview-actions"><button class="primary-btn" data-preview-download>Download e-book</button></div></div>`;
        els.previewContent.querySelector('[data-preview-download]')?.addEventListener('click', downloadPreviewFile);
        return;
      }

      els.previewContent.innerHTML = `<div class="preview-info"><div class="preview-big-icon">${driveFileIcon(path)}</div><strong>${escapeHtml(path.split('/').pop())}</strong><div class="preview-format">${escapeHtml((ext || 'FILE').toUpperCase())} · ${fmt(data.size || 0)}</div><p>This binary format cannot be rendered safely in the browser. RepoDrive can still download the original bytes without modification.</p><div class="preview-actions"><button class="primary-btn" data-preview-download>Download file</button></div></div>`;
      els.previewContent.querySelector('[data-preview-download]')?.addEventListener('click', downloadPreviewFile);
    } catch (e) {
      els.previewContent.innerHTML = `<div class="preview-info"><strong>Preview failed</strong><div class="preview-format">${escapeHtml(e.message)}</div><div class="preview-actions"><button class="primary-btn" data-preview-download>Download file</button></div></div>`;
      els.previewContent.querySelector('[data-preview-download]')?.addEventListener('click', downloadPreviewFile);
    }
  }


  // File History
  async function showFileHistory(path) {
    if (!selected) return;
    const branch = els.branchSelect.value;
    els.historyTitle.textContent = `History: ${path}`;
    els.historyList.innerHTML = '<div class="empty">Loading history…</div>';
    els.historyModal.showModal();
    
    try {
      const commits = await api(`/repos/${encodeURIComponent(selected.owner)}/${encodeURIComponent(selected.name)}/commits?path=${encodeURIComponent(path)}&per_page=20`);
      if (!commits.length) {
        els.historyList.innerHTML = '<div class="empty">No history found for this file.</div>';
        return;
      }
      els.historyList.innerHTML = commits.map(c => `
        <div class="search-result" onclick="window.open('${c.html_url}', '_blank')">
          <strong>${escapeHtml(c.commit.message)}</strong>
          <span style="font-size:12px;color:var(--text-secondary);">
            ${new Date(c.commit.author.date).toLocaleString()} · 
            ${c.commit.author.name} · 
            ${c.sha.slice(0,7)}
          </span>
        </div>
      `).join('');
    } catch (e) {
      els.historyList.innerHTML = `<div class="empty error">${escapeHtml(e.message)}</div>`;
    }
  }

  // Sharing
  function getShareableLink(path) {
    if (!selected) return '';
    const branch = els.branchSelect.value;
    return `https://raw.githubusercontent.com/${selected.owner}/${selected.name}/${branch}/${path}`;
  }

  async function shareFile(path) {
    const url = getShareableLink(path);
    els.shareContent.innerHTML = `
      <p>Share this file with anyone:</p>
      <div class="webdav-url">
        <code>${escapeHtml(url)}</code>
        <button id="copyShareUrl" class="secondary-btn">Copy</button>
      </div>
      <div style="margin-top:12px;">
        <button id="openShareUrl" class="primary-btn" onclick="window.open('${url}', '_blank')">Open file</button>
      </div>
    `;
    els.shareModal.showModal();
    
    document.getElementById('copyShareUrl')?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(url);
        toast('Link copied!', 'good');
      } catch { toast('Copy failed.', 'error'); }
    });
  }

  // Global Search
  async function globalSearch(query) {
    if (!query || query.length < 2) {
      toast('Enter at least 2 characters to search.', '');
      return;
    }
    
    try {
      const results = await api(`/search/code?q=${encodeURIComponent(query)}+user:${me.login}`);
      els.searchResultsList.innerHTML = results.items.map(item => `
        <div class="search-result" onclick="previewFile('${item.path}')">
          <strong>${escapeHtml(item.path)}</strong>
          <span style="font-size:12px;color:var(--text-secondary);">
            ${escapeHtml(item.repository.full_name)}
          </span>
          ${item.text_matches?.[0]?.fragment ? `<div class="match-preview">${escapeHtml(item.text_matches[0].fragment.slice(0, 200))}</div>` : ''}
        </div>
      `).join('') || '<div class="empty">No results found.</div>';
      els.searchResultsModal.showModal();
    } catch (e) {
      toast('Search failed: ' + e.message, 'error');
    }
  }

  // Favorites
  function toggleFavorite(path) {
    const key = `${selected.owner}/${selected.name}/${path}`;
    if (favorites[key]) {
      delete favorites[key];
      toast('⭐ Removed from favorites');
    } else {
      favorites[key] = { path, repo: selected.full_name, added: Date.now() };
      toast('⭐ Added to favorites!', 'good');
    }
    saveFavorites();
    renderTree();
  }

  function renderFavorites() {
    const favs = Object.values(favorites);
    if (!favs.length) {
      toast('No favorites yet. Star files to add them.', '');
      return;
    }
    // Show favorites list
    els.searchResultsList.innerHTML = favs.map(f => `
      <div class="search-result" onclick="previewFile('${f.path}')">
        <strong>⭐ ${escapeHtml(f.path)}</strong>
        <span style="font-size:12px;color:var(--text-secondary);">
          ${escapeHtml(f.repo)} · ${new Date(f.added).toLocaleDateString()}
        </span>
      </div>
    `).join('');
    els.searchResultsModal.showModal();
  }

  // WebDAV
  function showWebDAV() {
    if (!selected) {
      toast('Select a repository first.', 'error');
      return;
    }
    const url = `${window.location.origin}/api/webdav/${selected.owner}/${selected.name}`;
    els.webdavUrl.textContent = url;
    els.webdavModal.showModal();
  }

  // Analytics
  function showAnalytics() {
    if (!selected || !treeEntries.length) {
      toast('No data available for analytics.', '');
      return;
    }
    
    const totalFiles = treeEntries.length;
    const totalSize = treeEntries.reduce((sum, f) => sum + f.size, 0);
    const fileTypes = {};
    treeEntries.forEach(f => {
      const ext = getFileExtension(f.path) || 'no-extension';
      fileTypes[ext] = (fileTypes[ext] || 0) + 1;
    });
    
    els.analyticsFiles.textContent = totalFiles;
    els.analyticsSize.textContent = fmt(totalSize);
    els.analyticsTypes.textContent = Object.keys(fileTypes).length;
    
    // Show top file types
    const sorted = Object.entries(fileTypes).sort((a, b) => b[1] - a[1]).slice(0, 10);
    els.analyticsChart.innerHTML = `
      <div style="font-size:13px;color:var(--text-secondary);margin-bottom:12px;">Top file types:</div>
      ${sorted.map(([ext, count]) => `
        <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border);font-size:13px;">
          <span>.${escapeHtml(ext)}</span>
          <span>${count} files</span>
        </div>
      `).join('')}
    `;
    
    els.analyticsModal.showModal();
  }

  // Export Repository
  async function exportRepository() {
    if (!selected) return;
    const branch = els.branchSelect.value;
    const url = `https://api.github.com/repos/${selected.owner}/${selected.name}/zipball/${branch}`;
    toast('📦 Generating download…', '');
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' }
      });
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${selected.name}-backup.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
      toast('📦 Export complete!', 'good');
    } catch (e) {
      toast('Export failed: ' + e.message, 'error');
    }
  }

  // Setup Auto-Backup
  async function setupAutoBackup() {
    if (!selected) return;
    toast('⏳ Setting up auto-backup…', '');
    try {
      const workflow = `
name: Auto Backup
on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:
jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Create Backup
        run: |
          mkdir -p backups
          tar -czf backups/backup-$(date +%Y%m%d).tar.gz .
      - name: Upload Backup
        uses: actions/upload-artifact@v4
        with:
          name: backup-$(date +%Y%m%d)
          path: backups/backup-*.tar.gz
      `;
      
      await api(`/repos/${encodeURIComponent(selected.owner)}/${encodeURIComponent(selected.name)}/contents/.github/workflows/backup.yml`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Add auto-backup workflow',
          content: btoa(workflow),
          branch: selected.default_branch
        })
      });
      toast('✅ Auto-backup configured!', 'good');
    } catch (e) {
      toast('Failed to setup backup: ' + e.message, 'error');
    }
  }

  // Bulk Operations
  async function mutateTree(mode) {
    if (!selected || !selectedTree.size) return;
    const branch = els.branchSelect.value;
    els.bulkMove.disabled = true;
    els.bulkDelete.disabled = true;
    
    try {
      const owner = selected.owner, repo = selected.name;
      status('Preparing atomic file operation…');
      const ref = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/ref/heads/${encodeURIComponent(branch)}`);
      const head = ref.object.sha;
      const parent = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/commits/${head}`);
      const all = new Set(selectedTree);
      let tree = [];
      
      if (mode === 'delete') {
        tree = [...all].map(path => ({ path, mode: '100644', type: 'blob', sha: null }));
      } else {
        const folder = els.bulkFolder.value;
        for (const path of all) {
          const item = treeEntries.find(x => x.path === path);
          if (!item) continue;
          const name = path.split('/').pop();
          const prefix = els.prefix.value.trim().replace(/^\/+|\/+$/g, '');
          const newPath = [prefix, folder, name].filter(Boolean).join('/');
          const blob = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/blobs/${item.sha}`);
          tree.push({ path, mode: '100644', type: 'blob', sha: null });
          tree.push({ path: newPath, mode: '100644', type: 'blob', sha: item.sha });
        }
      }
      
      const newTree = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/trees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base_tree: parent.tree.sha, tree })
      });
      
      const commit = await api(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/commits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: mode === 'delete' ? `Delete ${all.size} file${all.size === 1 ? '' : 's'} via RepoDrive` : `Move ${all.size} file${all.size === 1 ? '' : 's'} via RepoDrive`,
          tree: newTree.sha,
          parents: [head]
        })
      });
      
      const upd = await fetch(`${API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/refs/heads/${encodeURIComponent(branch)}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'X-GitHub-Api-Version': API_VERSION,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sha: commit.sha, force: false })
      });
      const d = await upd.json();
      if (!upd.ok) throw new Error(d?.message || 'Branch update failed; no force push was attempted.');
      
      selectedTree.clear();
      status(`${mode === 'delete' ? 'Deleted' : 'Moved'} ${all.size} file${all.size === 1 ? '' : 's'} in one commit.`, 'good');
      toast('Repository updated.', 'good');
      await loadRepos();
      await loadTree();
    } catch (e) {
      status(e.message, 'error');
    } finally {
      els.bulkMove.disabled = false;
      els.bulkDelete.disabled = false;
    }
  }

  // Render Tree
  // Mixplorer-inspired cloud explorer -------------------------------------------------
  function driveIconSvg(kind) {
    const common = 'viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"';
    const paths = {
      folder: '<path d=\"M3.5 6.5h6l1.8 2h9.2v9.8a1.7 1.7 0 0 1-1.7 1.7H5.2a1.7 1.7 0 0 1-1.7-1.7z\"/><path d=\"M3.5 6.5v-1A1.5 1.5 0 0 1 5 4h4l1.6 2.1h4.1\"/>',
      image: '<rect x=\"3.5\" y=\"4\" width=\"17\" height=\"16\" rx=\"2\"/><circle cx=\"8.2\" cy=\"9\" r=\"1.5\"/><path d=\"m5.5 17 4.2-4.2 3 3 2-2 3.8 3.2\"/>',
      video: '<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"14\" rx=\"2\"/><path d=\"m10 9 5 3-5 3z\"/>',
      audio: '<path d=\"M9 18V6l10-2v12\"/><circle cx=\"6.5\" cy=\"18\" r=\"2.5\"/><circle cx=\"16.5\" cy=\"16\" r=\"2.5\"/>',
      archive: '<path d=\"M4 5.5h16v4H4zM5 9.5h14v9a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18.5z\"/><path d=\"M10 12h4M10 15h4\"/>',
      pdf: '<path d=\"M6 3.5h8l4 4v13H6z\"/><path d=\"M14 3.5v4h4M8.5 15.5h7M8.5 12.5h4\"/>',
      code: '<path d=\"m8 7-4 5 4 5M16 7l4 5-4 5M14 4l-4 16\"/>',
      text: '<path d=\"M6 3.5h8l4 4v13H6z\"/><path d=\"M14 3.5v4h4M9 12h6M9 15h6M9 18h4\"/>',
      file: '<path d=\"M6 3.5h8l4 4v13H6z\"/><path d=\"M14 3.5v4h4\"/>'
    };
    return `<svg class=\"mix-file-svg\" ${common}>${paths[kind] || paths.file}</svg>`;
  }

  function driveFileIcon(path, isFolder = false) {
    if (isFolder) return driveIconSvg('folder');
    const ext = getFileExtension(path);
    if (IMAGE_EXTS.includes(ext)) return driveIconSvg('image');
    if (VIDEO_EXTS.includes(ext)) return driveIconSvg('video');
    if (AUDIO_EXTS.includes(ext)) return driveIconSvg('audio');
    if (ARCHIVE_EXTS.includes(ext)) return driveIconSvg('archive');
    if (ext === 'pdf') return driveIconSvg('pdf');
    if (FONT_EXTS.includes(ext)) return driveIconSvg('text');
    if (OFFICE_EXTS.includes(ext) || EBOOK_EXTS.includes(ext)) return driveIconSvg('text');
    if (TEXT_EXTS.includes(ext) || ['dockerfile','makefile','license','readme'].includes(String(path).split('/').pop().toLowerCase())) return driveIconSvg('code');
    return driveIconSvg('file');
  }


  function driveRepoIcon(privateRepo = false) {
    return privateRepo
      ? '<svg class=\"mix-repo-svg lock\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><rect x=\"5\" y=\"10\" width=\"14\" height=\"10\" rx=\"2\"/><path d=\"M8 10V7a4 4 0 0 1 8 0v3\"/></svg>'
      : '<svg class=\"mix-repo-svg\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"7.5\"/></svg>';
  }

  function driveFolderData() {
    const prefix = drivePath ? drivePath.replace(/\/$/, '') + '/' : '';
    const folders = new Map();
    const files = [];
    for (const item of treeEntries) {
      if (!showHiddenFiles && item.path.split('/').some(part => part.startsWith('.'))) continue;
      if (!item.path.startsWith(prefix)) continue;
      const rest = item.path.slice(prefix.length);
      if (!rest) continue;
      const parts = rest.split('/');
      if (parts.length > 1) {
        const folder = parts[0];
        if (!folders.has(folder)) folders.set(folder, { name: folder, path: prefix + folder, size: 0, files: 0 });
        const f = folders.get(folder); f.size += item.size; f.files++;
      } else files.push(item);
    }
    return { folders:[...folders.values()], files };
  }

  function renderDriveRepos() {
    if (!els.driveRepoList) return;
    const q = (els.driveRepoSearch?.value || '').trim().toLowerCase();
    const list = repositories.filter(r => !q || r.full_name.toLowerCase().includes(q));
    els.driveRepoCount.textContent = String(repositories.length);
    els.driveRepoList.innerHTML = '';
    if (!list.length) {
      els.driveRepoList.innerHTML = '<div class="empty" style="padding:12px;font-size:11px">No repositories</div>';
      return;
    }
    for (const r of list) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `drive-repo-item${selected?.id === r.id ? ' active' : ''}`;
      b.innerHTML = `<div class="r-title"><span class="r-lock">${driveRepoIcon(r.private)}</span><span>${escapeHtml(r.name)}</span></div><div class="r-meta">${fmt(r.sizeKB * 1024)} · ${escapeHtml(r.default_branch)}</div>`;
      b.addEventListener('click', () => { selectRepo(r); document.body.classList.remove('drive-menu-open'); els.driveMenu?.setAttribute('aria-expanded','false'); });
      els.driveRepoList.appendChild(b);
    }
  }

  function renderDriveLocation() {
    if (!els.driveRepoTitle) return;
    if (!selected) {
      els.driveRepoTitle.textContent = 'Select a repository';
      els.driveRepoMeta.textContent = 'Your GitHub repositories appear here like cloud drives.';
      els.driveOpenGithub.disabled = true; els.driveShareRepo.disabled = true;
      els.driveBreadcrumbs.innerHTML = '<span class="drive-crumb current">My repositories</span>';
      return;
    }
    els.driveRepoTitle.textContent = selected.full_name;
    els.driveRepoMeta.textContent = `${selected.private ? 'Private' : 'Public'} · ${fmt(selected.sizeKB * 1024)} reported by GitHub`;
    els.driveOpenGithub.disabled = false; els.driveShareRepo.disabled = false;
    els.driveOpenGithub.onclick = () => window.open(selected.html_url, '_blank', 'noopener');
    els.driveShareRepo.onclick = () => shareFile('');
    const parts = drivePath ? drivePath.split('/').filter(Boolean) : [];
    let html = `<button class="drive-crumb${parts.length ? '' : ' current'}" data-drive-path="">${escapeHtml(selected.name)}</button>`;
    let acc = '';
    parts.forEach((part, i) => {
      acc += (acc ? '/' : '') + part;
      html += `<span class="drive-crumb-sep">›</span><button class="drive-crumb${i === parts.length-1 ? ' current' : ''}" data-drive-path="${escapeHtml(acc)}">${escapeHtml(part)}</button>`;
    });
    els.driveBreadcrumbs.innerHTML = html;
    els.driveBreadcrumbs.querySelectorAll('[data-drive-path]').forEach(btn => btn.addEventListener('click', () => { driveHistory=[]; drivePath=btn.dataset.drivePath || ''; renderDriveLocation(); renderDriveFiles(); }));
    els.drivePathLabel.textContent = parts.length ? parts[parts.length-1] : 'Repository root';
    els.driveBranchStatus.textContent = `branch ${els.branchSelect.value || selected.default_branch}`;
  }

  function renderDriveFiles() {
    if (!els.driveFileGrid) return;
    renderDriveLocation();
    const q = (els.driveFileSearch?.value || '').trim().toLowerCase();
    let { folders, files } = driveFolderData();
    if (q) {
      folders = folders.filter(x => x.name.toLowerCase().includes(q));
      files = files.filter(x => x.path.split('/').pop().toLowerCase().includes(q));
    }
    const sort = els.driveSort?.value || 'name';
    const cmp = (a,b) => sort === 'size' ? (b.size-a.size) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name);
    folders.sort(cmp); files.sort(cmp);
    const total = folders.length + files.length;
    els.driveItemCount.textContent = `${total} item${total === 1 ? '' : 's'}`;
    els.driveFileGrid.classList.remove('list-mode');
    els.driveFileGrid.innerHTML = '';
    els.driveEmpty.classList.toggle('hidden', total !== 0);
    if (!total) return;

    for (const folder of folders) {
      const item = document.createElement('article');
      item.className = 'drive-item folder';
      item.innerHTML = `<div class="drive-item-head"><div class="drive-file-icon">${driveFileIcon('',true)}</div><div class="drive-item-name">${escapeHtml(folder.name)}</div></div><div class="drive-item-meta"><span>${folder.files} file${folder.files===1?'':'s'}</span><span>${fmt(folder.size)}</span></div>`;
      item.addEventListener('click', () => {
        driveHistory.push(drivePath);
        drivePath = folder.path;
        renderDriveFiles();
      });
      els.driveFileGrid.appendChild(item);
    }
    for (const f of files) {
      const name = f.path.split('/').pop();
      const checked = selectedTree.has(f.path);
      const item = document.createElement('article');
      item.className = `drive-item file-row${checked ? ' selected' : ''}`;
      item.innerHTML = `<input class="drive-item-check" type="checkbox" ${checked ? 'checked' : ''} aria-label="Select ${escapeHtml(name)}"><div class="drive-item-head"><div class="drive-file-icon">${driveFileIcon(f.path)}</div><div class="drive-item-name" title="${escapeHtml(f.path)}">${escapeHtml(name)}</div></div><div class="drive-item-type">${escapeHtml((f.path.split('.').pop()||'FILE').toUpperCase())}</div><div class="drive-item-meta"><span>${fmt(f.size)}</span></div><div class="drive-item-actions"><button data-action="preview" title="Preview">◉</button><button data-action="favorite" title="Favorite">★</button><button data-action="share" title="Share">⌯</button></div>`;
      const cb=item.querySelector('.drive-item-check');
      cb.addEventListener('click', e => e.stopPropagation());
      cb.addEventListener('change', () => { cb.checked ? selectedTree.add(f.path) : selectedTree.delete(f.path); item.classList.toggle('selected',cb.checked); renderBulk(); });
      item.addEventListener('dblclick', () => previewFile(f.path));
      item.addEventListener('click', e => { if (e.target.closest('button') || e.target.closest('input')) return; previewFile(f.path); });
      item.querySelector('[data-action="preview"]').addEventListener('click', () => previewFile(f.path));
      item.querySelector('[data-action="favorite"]').addEventListener('click', () => toggleFavorite(f.path));
      item.querySelector('[data-action="share"]').addEventListener('click', () => shareFile(f.path));
      els.driveFileGrid.appendChild(item);
    }
    const sum = treeEntries.reduce((n,x)=>n+x.size,0);
    els.driveStorageStatus.textContent = `${treeEntries.length} files · ${fmt(sum)}`;
    els.driveSyncStatus.textContent = `Synced ${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`;
  }

  function driveGoUp() {
    if (!drivePath) return;
    const parts=drivePath.split('/').filter(Boolean); parts.pop(); drivePath=parts.join('/'); renderDriveFiles();
  }

  function renderTree() {
    if (els.driveFileGrid) { renderDriveFiles(); return; }
    const q = els.fileSearch.value.trim().toLowerCase();
    let list = treeEntries.filter(x => {
      if (!showHiddenFiles && x.path.split('/').pop().startsWith('.')) return false;
      return !q || x.path.toLowerCase().includes(q);
    });
    
    els.fileTree.innerHTML = '';
    if (!list.length) {
      els.fileTreeEmpty.classList.remove('hidden');
      return;
    }
    els.fileTreeEmpty.classList.add('hidden');
    
    for (const x of list) {
      const row = document.createElement('div');
      row.className = 'tree-row fade-in';
      
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = selectedTree.has(x.path);
      cb.style.width = 'auto';
      cb.addEventListener('change', () => {
        cb.checked ? selectedTree.add(x.path) : selectedTree.delete(x.path);
        renderBulk();
      });
      
      const p = document.createElement('span');
      p.className = 'path';
      p.title = x.path;
      p.textContent = x.path;
      p.addEventListener('click', () => previewFile(x.path));
      
      const size = document.createElement('span');
      size.className = 'size';
      size.textContent = fmt(x.size);
      
      const actions = document.createElement('span');
      actions.className = 'tree-actions';
      actions.innerHTML = `
        <button onclick="previewFile('${x.path}')" title="Preview">👁️</button>
        <button onclick="toggleFavorite('${x.path}')" title="Favorite">⭐</button>
        <button onclick="shareFile('${x.path}')" title="Share">🔗</button>
        <a href="https://github.com/${encodeURIComponent(selected.owner)}/${encodeURIComponent(selected.name)}/blob/${encodeURIComponent(els.branchSelect.value)}/${x.path.split('/').map(encodeURIComponent).join('/')}" target="_blank" rel="noopener" title="Open on GitHub">↗</a>
      `;
      
      row.append(cb, p, size, actions);
      els.fileTree.appendChild(row);
    }
  }

  function renderBulk() {
    const n = selectedTree.size;
    els.bulkBar.classList.toggle('hidden', n === 0);
    els.bulkCount.textContent = `${n} selected`;
    els.bulkFolder.innerHTML = '';
    const folders = [...new Set(rules.map(r => r.folder).concat(['Other']))];
    for (const f of folders) {
      const o = document.createElement('option');
      o.value = f;
      o.textContent = `Move to ${f}`;
      els.bulkFolder.appendChild(o);
    }
  }

  // Create Repository
  async function createRepo() {
    const name = els.newRepoName.value.trim();
    if (!/^[A-Za-z0-9._-]{1,100}$/.test(name)) {
      els.repoCreateStatus.textContent = 'Use 1–100 letters, numbers, dots, hyphens, or underscores.';
      els.repoCreateStatus.className = 'status error';
      return;
    }
    els.createRepo.disabled = true;
    els.repoCreateStatus.textContent = 'Creating repository…';
    els.repoCreateStatus.className = 'status';
    try {
      const r = await api('/user/repos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description: els.newRepoDesc.value.trim(),
          private: els.newRepoPrivate.checked,
          auto_init: els.newRepoInit.checked
        })
      });
      els.repoDialog.close();
      els.newRepoName.value = '';
      toast(`Created ${r.full_name}.`, 'good');
      await loadRepos();
      const found = repositories.find(x => x.id === r.id);
      if (found) await selectRepo(found);
    } catch (e) {
      els.repoCreateStatus.textContent = e.status === 403 ? 'GitHub rejected repository creation. Your GitHub App needs Administration: write permission and that permission must be approved for the installation.' : e.message;
      els.repoCreateStatus.className = 'status error';
    } finally {
      els.createRepo.disabled = false;
    }
  }

  // Render Rules
  function renderRules() {
    els.rulesList.innerHTML = '';
    rules.forEach((r, i) => {
      const row = document.createElement('div');
      row.className = 'rule-row';
      row.innerHTML = `
        <span>${escapeHtml(r.pattern)}</span>
        <span>${escapeHtml(r.folder)}</span>
        <button class="link-btn">Remove</button>
      `;
      row.querySelector('button').addEventListener('click', () => {
        rules.splice(i, 1);
        saveRules();
      });
      els.rulesList.appendChild(row);
    });
  }

  // Suggest Rules
  async function suggestRules() {
    if (!selected) return;
    toast('🔮 Analyzing files for suggestions…', '');
    try {
      const files = treeEntries.map(f => f.path);
      const extensions = {};
      files.forEach(f => {
        const ext = getFileExtension(f);
        if (ext) extensions[ext] = (extensions[ext] || 0) + 1;
      });
      
      // Suggest rules based on common extensions
      const suggestions = {
        'Images': ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico', 'bmp', 'tiff'],
        'Videos': ['mp4', 'mov', 'avi', 'mkv', 'webm', 'wmv', 'flv'],
        'Audio': ['mp3', 'wav', 'flac', 'm4a', 'aac', 'ogg'],
        'Documents': ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf'],
        'Code': ['js', 'ts', 'py', 'java', 'cpp', 'c', 'go', 'rs', 'rb', 'php', 'html', 'css', 'json', 'xml', 'yaml', 'yml', 'toml', 'sh', 'bash'],
        'Data': ['csv', 'tsv', 'sqlite', 'db', 'sql', 'parquet'],
        'Archives': ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz']
      };
      
      let added = 0;
      for (const [folder, exts] of Object.entries(suggestions)) {
        const found = exts.filter(e => extensions[e] > 0);
        if (found.length > 0 && !rules.some(r => r.folder === folder)) {
          const pattern = `\\.(${found.join('|')})$`;
          rules.push({ pattern, folder });
          added++;
        }
      }
      
      saveRules();
      toast(`✨ Added ${added} suggested rules!`, 'good');
    } catch (e) {
      toast('Could not suggest rules: ' + e.message, 'error');
    }
  }

  // Export Pending List
  function exportPendingList() {
    if (!pending.length) {
      toast('No pending files to export.', '');
      return;
    }
    const data = pending.map(x => ({
      source: x.sourcePath,
      destination: x.destPath,
      size: x.file.size,
      sizeFormatted: fmt(x.file.size)
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pending-files-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('📋 Pending list exported!', 'good');
  }

  // Watch Repository
  async function toggleWatch() {
    if (!selected) return;
    try {
      await api(`/user/subscriptions/${selected.owner}/${selected.name}`, {
        method: 'PUT'
      });
      toast('👁️ Watching repository for updates', 'good');
    } catch (e) {
      toast('Could not watch repository: ' + e.message, 'error');
    }
  }

  // Boot
  async function boot() {
    updateRuleCount();
    initTheme();
    renderDriveLocation();
    els.rememberSession.checked = localStorage.getItem(REMEMBER_KEY) === '1';
    if (!configured()) els.loginHint.textContent = 'Setup required: put your GitHub App Client ID in config.js, then redeploy.';
    if (els.rememberSession.checked) {
      els.loginHint.textContent = 'Saved session found. Restoring GitHub connection…';
      const restored = await restoreSavedSession();
      if (restored) toast('🔐 GitHub session restored.', 'good');
    }
  }

  // Event Listeners
  els.rememberSession.addEventListener('change', () => {
    if (els.rememberSession.checked) {
      localStorage.setItem(REMEMBER_KEY, '1');
      persistSession();
    } else {
      forgetSavedSession();
    }
  });
  els.loginBtn.addEventListener('click', login);
  els.cancelAuth.addEventListener('click', () => { authAbort?.abort(); els.authDialog.close(); });
  els.copyCode.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(els.deviceCode.textContent);
      toast('Code copied.', 'good');
    } catch { toast('Copy failed.', 'error'); }
  });
  els.logoutBtn.addEventListener('click', () => { clearSession(true); location.reload(); });
  els.refreshBtn.addEventListener('click', loadRepos);
  els.installBtn.addEventListener('click', () => window.open(installUrl(), '_blank', 'noopener'));
  els.reloadReposBtn.addEventListener('click', loadRepos);
  els.repoSearch.addEventListener('input', renderRepos);
  els.repoSort.addEventListener('change', renderRepos);
  els.newRepoBtn.addEventListener('click', () => { els.repoCreateStatus.textContent = ''; els.repoDialog.showModal(); });
  els.cancelRepo.addEventListener('click', () => els.repoDialog.close());
  els.createRepo.addEventListener('click', createRepo);
  els.changeRepoBtn.addEventListener('click', () => { els.workspace.classList.add('hidden'); window.scrollTo({ top: document.querySelector('.repo-card').offsetTop - 80, behavior: 'smooth' }); });
  els.shareRepoBtn.addEventListener('click', () => shareFile(''));
  els.watchRepoBtn.addEventListener('click', toggleWatch);
  els.branchSelect.addEventListener('change', () => { renderPending(); loadTree(); });
  els.prefix.addEventListener('input', () => { pending = pending.map(x => ({ ...x, destPath: buildPath(x.sourcePath) })); renderPending(); });
  els.pickFiles.addEventListener('click', () => els.filePicker.click());
  els.pickFolder.addEventListener('click', () => els.folderPicker.click());
  els.filePicker.addEventListener('change', e => addPending(e.target.files));
  els.folderPicker.addEventListener('change', e => addPending(e.target.files));
  els.clearSelection.addEventListener('click', () => { pending = []; els.filePicker.value = ''; els.folderPicker.value = ''; renderPending(); });
  els.exportPending.addEventListener('click', exportPendingList);
  
  ['dragenter', 'dragover'].forEach(t => els.dropZone.addEventListener(t, e => { e.preventDefault(); els.dropZone.classList.add('drag'); }));
  ['dragleave', 'drop'].forEach(t => els.dropZone.addEventListener(t, e => { e.preventDefault(); els.dropZone.classList.remove('drag'); }));
  els.dropZone.addEventListener('drop', e => addPending(e.dataTransfer.files));
  els.commitBtn.addEventListener('click', publish);
  els.fileSearch.addEventListener('input', renderTree);
  els.refreshTreeBtn.addEventListener('click', loadTree);
  els.showHidden.addEventListener('click', () => { showHiddenFiles = !showHiddenFiles; renderTree(); });
  els.bulkDelete.addEventListener('click', () => { if (confirm(`Delete ${selectedTree.size} selected file(s)? This creates one commit.`)) mutateTree('delete'); });
  els.bulkMove.addEventListener('click', () => mutateTree('move'));
  els.bulkDownload.addEventListener('click', () => {
    if (!selectedTree.size) return;
    const files = [...selectedTree].map(path => 
      `https://raw.githubusercontent.com/${selected.owner}/${selected.name}/${els.branchSelect.value}/${path}`
    );
    for (const url of files) window.open(url, '_blank');
    toast(`Opening ${files.length} file(s)...`, '');
  });
  els.bulkShare.addEventListener('click', () => {
    if (!selectedTree.size) return;
    const paths = [...selectedTree];
    if (paths.length === 1) {
      shareFile(paths[0]);
    } else {
      toast('Select a single file to share.', 'error');
    }
  });
  
  els.rulesBtn.addEventListener('click', () => { renderRules(); els.rulesDialog.showModal(); });
  els.suggestRulesBtn.addEventListener('click', suggestRules);
  els.closeRules.addEventListener('click', () => els.rulesDialog.close());
  els.resetRules.addEventListener('click', () => { rules = DEFAULT_RULES.slice(); saveRules(); toast('Rules reset to defaults.', 'good'); });
  els.addRule.addEventListener('click', () => {
    const pattern = els.rulePattern.value.trim(), folder = els.ruleFolder.value.trim();
    if (!pattern || !folder) { toast('Please enter both pattern and folder.', 'error'); return; }
    rules.push({ pattern, folder: folder.replace(/[\\/:*?"<>|]/g, '-') });
    els.rulePattern.value = '';
    els.ruleFolder.value = '';
    saveRules();
  });
  
  els.themeToggle.addEventListener('click', toggleTheme);
  els.globalSearch.addEventListener('keydown', e => { if (e.key === 'Enter') globalSearch(e.target.value); });
  els.globalSearchBtn.addEventListener('click', () => {
    els.globalSearchBar.classList.toggle('hidden');
    if (!els.globalSearchBar.classList.contains('hidden')) els.globalSearch.focus();
  });
  els.globalSearchExecute.addEventListener('click', () => globalSearch(els.globalSearch.value));
  
  els.viewToggle.addEventListener('click', () => {
    viewMode = viewMode === 'list' ? 'grid' : 'list';
    viewMode === 'grid' ? renderTree() : renderTree();
    els.viewToggle.textContent = viewMode === 'list' ? 'Grid View' : 'List View';
  });
  els.showFavorites.addEventListener('click', renderFavorites);
  els.showRecent.addEventListener('click', () => {
    const sorted = [...treeEntries].sort((a, b) => b.size - a.size).slice(0, 20);
    els.searchResultsList.innerHTML = sorted.map(x => `
      <div class="search-result" onclick="previewFile('${x.path}')">
        <strong>${escapeHtml(x.path)}</strong>
        <span style="font-size:12px;color:var(--text-secondary);">${fmt(x.size)}</span>
      </div>
    `).join('');
    els.searchResultsModal.showModal();
  });
  
  // Preview modal events
  els.closePreview.addEventListener('click', closePreview);
  els.closePreviewBtn.addEventListener('click', closePreview);
  els.previewModal.addEventListener('cancel', e => { e.preventDefault(); closePreview(); });
  els.previewModal.addEventListener('click', e => { if (e.target === els.previewModal) closePreview(); });
  els.previewModal.addEventListener('close', revokePreviewUrl);
  els.downloadPreview.addEventListener('click', downloadPreviewFile);
  els.sharePreview.addEventListener('click', () => {
    if (currentPreviewFile) shareFile(currentPreviewFile);
  });
  els.historyPreview.addEventListener('click', () => {
    if (currentPreviewFile) showFileHistory(currentPreviewFile);
  });
  
  // Search results modal
  els.closeSearchResults.addEventListener('click', () => els.searchResultsModal.close());
  
  // History modal
  els.closeHistory.addEventListener('click', () => els.historyModal.close());
  
  // Share modal
  els.closeShare.addEventListener('click', () => els.shareModal.close());
  els.closeShareBtn.addEventListener('click', () => els.shareModal.close());
  els.copyShareLink.addEventListener('click', async () => {
    const url = els.shareContent.querySelector('code')?.textContent;
    if (url) {
      try {
        await navigator.clipboard.writeText(url);
        toast('Link copied!', 'good');
      } catch { toast('Copy failed.', 'error'); }
    }
  });
  
  // WebDAV modal
  els.closeWebdav.addEventListener('click', () => els.webdavModal.close());
  els.closeWebdavBtn.addEventListener('click', () => els.webdavModal.close());
  els.copyWebdavUrl.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(els.webdavUrl.textContent);
      toast('URL copied!', 'good');
    } catch { toast('Copy failed.', 'error'); }
  });
  
  // Analytics modal
  els.closeAnalytics.addEventListener('click', () => els.analyticsModal.close());
  els.closeAnalyticsBtn.addEventListener('click', () => els.analyticsModal.close());
  
  // Quick actions
  els.exportRepo.addEventListener('click', exportRepository);
  els.setupBackup.addEventListener('click', setupAutoBackup);
  els.viewAnalytics.addEventListener('click', showAnalytics);
  els.webdavMount.addEventListener('click', showWebDAV);
  
  // Cloud explorer controls
  if (els.driveMenu) els.driveMenu.addEventListener('click', () => {
    const open = document.body.classList.toggle('drive-menu-open');
    els.driveMenu.setAttribute('aria-expanded', String(open));
  });
  if (els.driveRepoSearch) els.driveRepoSearch.addEventListener('input', renderDriveRepos);
  if (els.driveNewRepo) els.driveNewRepo.addEventListener('click', () => els.newRepoBtn.click());
  if (els.driveSignOut) els.driveSignOut.addEventListener('click', () => { clearSession(true); location.reload(); });
  if (els.driveUpload) els.driveUpload.addEventListener('click', () => els.filePicker.click());
  if (els.driveEmptyUpload) els.driveEmptyUpload.addEventListener('click', () => els.filePicker.click());
  if (els.driveRefresh) els.driveRefresh.addEventListener('click', loadTree);
  if (els.driveBack) els.driveBack.addEventListener('click', () => { if (driveHistory.length) drivePath=driveHistory.pop(); else driveGoUp(); renderDriveFiles(); });
  if (els.driveUp) els.driveUp.addEventListener('click', driveGoUp);
  if (els.driveFileSearch) els.driveFileSearch.addEventListener('input', renderDriveFiles);
  if (els.driveSort) els.driveSort.addEventListener('change', renderDriveFiles);
  if (els.driveSelectAll) els.driveSelectAll.addEventListener('click', () => {
    const {files}=driveFolderData(); files.forEach(f=>selectedTree.add(f.path)); renderDriveFiles(); renderBulk();
  });
  if (els.driveMore) els.driveMore.addEventListener('click', () => {
    if (!selected) return toast('Select a repository first.','error');
    toast('Use the action buttons below the explorer for analytics, backup, WebDAV and reports.','');
  });
  if (els.driveDropZone) {
    ['dragenter','dragover'].forEach(t => els.driveDropZone.addEventListener(t,e=>{e.preventDefault(); els.driveDropZone.classList.add('drag');}));
    ['dragleave','drop'].forEach(t => els.driveDropZone.addEventListener(t,e=>{e.preventDefault(); els.driveDropZone.classList.remove('drag');}));
    els.driveDropZone.addEventListener('drop', e => addPending(e.dataTransfer.files));
  }
  if (els.filePicker) els.filePicker.addEventListener('change', () => setTimeout(renderDriveFiles, 0));
  if (me && els.driveUserName) { els.driveUserName.textContent=me.login; els.driveAvatar.textContent=(me.login||'?').slice(0,1).toUpperCase(); }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'u') { e.preventDefault(); els.filePicker.click(); }
    if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); els.commitBtn.click(); }
    if (e.ctrlKey && e.key === 'f') { e.preventDefault(); els.fileSearch.focus(); }
    if (e.key === 'Escape') {
      document.querySelectorAll('dialog[open]').forEach(d => d.close());
    }
  });

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  // Expose functions to global scope for inline HTML onclick handlers
  window.previewFile = previewFile;
  window.shareFile = shareFile;
  window.toggleFavorite = toggleFavorite;
  window.showFileHistory = showFileHistory;

  boot();
  if (new URLSearchParams(location.search).get('login') === '1') {
    history.replaceState({}, '', location.pathname);
    setTimeout(() => els.loginBtn?.click(), 0);
  }
})();