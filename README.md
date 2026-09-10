# Ledger

A small React app for logging purchases: product name, price, remaining balance, and an optional note. Entries are viewable on a separate Products page, reachable from the navbar.

## Folder structure

```
purchase-ledger/
├── index.html          entry HTML, mounts the app
├── package.json         dependencies + scripts
├── vite.config.js        Vite + React plugin config
├── README.md
└── src/
    ├── main.jsx          React root, renders <App />
    ├── App.jsx           all app logic + markup (form page, products page)
    └── index.css         theme, layout, and component styles
```

## Running locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

`npm run build` outputs a static production bundle to `dist/`, which can be opened locally or hosted anywhere later if needed.

## Notes

- All entries are kept in memory (React state) — refreshing the page clears them. Ask if you'd like persistence (e.g. localStorage) added.
- Fonts (Space Grotesk, JetBrains Mono) load from Google Fonts via `src/index.css`.
