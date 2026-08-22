<p align="center">
  <img src="./assets/logo-header.png" alt="RepoDrive" width="280" />
</p>

<h1 align="center">RepoDrive</h1>

<p align="center">
  <strong>v0.1.5 prototype</strong><br />
  Use a GitHub repository as simple personal cloud storage — from your browser.
</p>

<p align="center">
  <em>Open the website · Sign in with GitHub · Pick a repo · Upload and manage files</em>
</p>

---

## What is this?

**RepoDrive** is a web app that turns a GitHub repository into a lightweight file drive. You open the site in your browser, connect your GitHub account, choose a repository, and manage files with a familiar folder-style interface.

This is a **prototype (v0.1.5)**. It is useful for personal backups, sharing project files, and treating a private repo like cloud storage. It is **not** a full Google Drive or Dropbox replacement.

---

## Who it's for

Anyone who:

- Already has a **GitHub account**
- Wants to store files in a **repository** 

The app handles commits for you.

---

## How to use it (step by step)

### 1. Open the website

Go to the <a href="https://repodrive-xi.vercel.app/">RepoDrive URL</a>
Use a modern browser: Chrome, Firefox, Edge, or Safari.

### 2. Sign in with GitHub

1. On the home screen, start **Sign in**.
2. You will see a **code** and a link to GitHub.
3. Open that link (on the same phone or another device), sign into GitHub if needed, and enter the code.
4. Approve access when GitHub asks.
5. Return to RepoDrive — you should land in the drive interface.

Sign-in uses GitHub's **device flow**. Your password is never typed into RepoDrive.

### 3. Choose a repository

- The left sidebar lists your repositories (your "drives").
- Tap or click one to open it.
- Private and public repos both work if the GitHub App is allowed to access them.

Tip: Create a dedicated private repo such as `Cloud` or `MyDrive` for personal files.

### 4. Browse folders

- Folders appear as **yellow tiles** (grid layout).
- Tap a folder to open it.
- Use the **path bar** under the toolbar to jump up levels (`Repo › Audio › …`).
- **⌂** returns to the repository root.
- **‹** Back and **↑** Up also move through folders.

### 5. Upload files

1. Open the folder where you want the files (or stay at the root).
2. Tap **Upload** (or drop files onto the drop zone if shown).
3. Choose one or more files.
4. Watch the **progress bar** while files are committed to GitHub.
5. The file list **refreshes** when the upload finishes.

**Auto-sort (optional)**  
When **Auto** is on, uploads are sorted into folders by type — for example Images, Audio, Documents, Videos. Turn Auto off to keep files in the folder you currently have open.

### 6. Preview files

Tap a file to preview it when the type is supported:

| Type | Examples |
|------|----------|
| Images | JPG, PNG, WebP, GIF, SVG |
| Audio | MP3, M4A, WAV, OGG, Opus* |
| Video | MP4, WebM (browser-dependent) |
| Text / code | TXT, MD, JSON, JS, HTML, and similar |
| PDF | In-browser when the browser supports it |

\*Some formats depend on the browser (e.g. Opus on Safari). If playback fails, use **Download**.

### 7. Download

- On a file: use the **↓** action, or download from the preview.
- With several files selected: use **Download** on the bulk bar.
- With nothing selected: **↓** can download a **ZIP** of the whole repository branch.

### 8. Organize

| Action | How |
|--------|-----|
| **New folder** | Toolbar **＋** → enter a name |
| **Rename** | Hover/tap actions on a tile → ✎ |
| **Copy / Cut / Paste** | Select files → Copy or Cut → open target folder → Paste |
| **Move to Trash** | Select files → 🗑, or long-press a tile |
| **Restore** | Open **Trash** → restore (↩) on an item |
| **Delete forever** | Only from inside Trash |

Trash lives in a `.trash` folder inside the repository (GitHub has no separate recycle bin).

### 9. Favorites & recent

- **☆** on a file adds it to favorites.
- **★ Fav** or the sidebar **Favorites** entry opens your starred list.
- Opening a preview adds it to **Recent**.

### 10. Branches

Use the **branch** dropdown in the toolbar (often `main`) to switch branches. The file list reloads for that branch.

### 11. Sign out

Use **Sign out** in the header or sidebar when you're done, especially on a shared device.

---

## What RepoDrive stores

- Files are stored as normal files in **your GitHub repository**.
- Each upload, delete, rename, or trash action creates a **git commit** on the selected branch.
- You can always open the same repo on github.com or with git — nothing is locked inside RepoDrive.

---

## Limits (prototype)

Please keep these in mind while using **v0.1.5**:

| Topic | Detail |
|-------|--------|
| **Not a full cloud suite** | No desktop sync app, no real-time collaboration, no Google-Docs-style editing |
| **GitHub rules apply** | File size, repo size, and API rate limits follow your GitHub plan |
| **Best for moderate files** | Prefer files under typical git-friendly sizes; very large binaries are a poor fit without Git LFS |
| **Private repos** | Need correct GitHub App permissions on that account/org |
| **Browser codecs** | Some audio/video types may need download instead of in-browser play |

---

## Privacy & safety

- Authentication goes through **GitHub**. RepoDrive does not see your GitHub password.
- File content is stored on **GitHub's** servers under your account.
- Prefer **private** repositories for personal documents and media.
- On a shared computer, always **sign out** when finished.

---

## About this version

```
Product     RepoDrive
Version     0.1.5 (prototype)
Interface   Browser-based file manager
Backend     GitHub repositories (API)
Status      Early public prototype — features may change
```

Feedback and issues help shape later releases. Treat this build as a practical experiment: useful today, still evolving.

---

<p align="center">
  <img src="./assets/logo-mark.png" alt="" width="48" /><br />
  <sub>RepoDrive · GitHub as your cloud · v0.1.5 prototype</sub>
</p>
