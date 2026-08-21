RepoDrive 0.1.5 — Cloud Explorer rebuild

This is a front-end patch for the existing RepoDrive 0.1.5 Vercel build.

Replace these four files in your current project:
  index.html
  app.js
  styles.css
  sw.js

Do NOT replace config.js. Keep your existing GitHub App configuration.

Major UI changes:
- Mixplorer HTTP-server inspired cloud explorer
- Repository sidebar behaves like cloud drives
- Repository root -> folders -> files navigation
- Breadcrumb navigation
- Grid/list file views
- Folder aggregation from GitHub tree
- File preview on click/double-click
- Per-file preview/favorite/share actions
- Search within the current folder
- Select-all for current folder
- Upload/drop workflow hooks into the existing staging + commit system
- Teal #1e5050 + near-black + soft-white theme
- Dark explorer theme is used as the new v0.1.5 default
- Existing GitHub App authentication and saved-session logic are preserved

Important:
The explorer does not create empty Git folders because GitHub Git trees do not
store empty directories. A folder appears when it contains a committed file.
