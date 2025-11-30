# Iceland TopoJSON Map (static site)

This is a minimal static website that renders your Iceland TopoJSON file with D3 + topojson-client.

What to do:
1. Put your full TopoJSON file at: `data/Iceland_admin_level_6.topojson`
   - Replace the placeholder content in that file with the actual JSON you have.
2. Open `index.html` in a modern browser (or run a static server like `npx http-server` or `python -m http.server 8000`) to view the map.
3. To publish:
   - Push to a GitHub repository and enable GitHub Pages (choose main branch /docs or root depending on where files are).
   - Or deploy to any static host (Netlify, Vercel static, Surge, etc.).

Files included:
- `index.html` — UI and markup
- `styles.css` — minimal styling
- `main.js` — loads the TopoJSON and renders it
- `data/Iceland_admin_level_6.topojson` — placeholder file; replace with your data

If you want, I can:
- Add these files to your GitHub repo and push a branch for you (I tried but couldn't finish the push from here).
- Embed your TopoJSON directly into the site (single-file build).
- Add search/select/export features or simplify the topology.

Tell me how you'd like to proceed.