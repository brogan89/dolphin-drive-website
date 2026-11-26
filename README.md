# Dolphin Drive website

Static site (plain HTML/CSS/JS, no build step) for GitHub Pages.

## Update the site

Everything you'll normally change is in `data.js`:

- **Add a show:** add an entry to `SHOWS`. Date format is `"YYYY-MM-DDTHH:MM"` in NZ time. Shows move to "Past shows" by themselves the morning after.
- **Add a song:** put the MP3 in `assets/audio/`, then add it to `SINGLES` (with cover art in `assets/img/`) or `DEMOS`.
- **Add photos:** put them in `assets/img/gallery/` and add the filename to `PHOTOS`.

Commit and push. The live site updates in about a minute.

## Preview locally

```bash
python3 -m http.server 8420
```

Open http://localhost:8420

## First-time deploy to GitHub Pages

1. Create an empty public repo on GitHub, e.g. `dolphin-drive-website`.
2. Push this folder to it:
   ```bash
   git init && git add . && git commit -m "Dolphin Drive website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/dolphin-drive-website.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save.**
4. Site goes live at `https://<your-username>.github.io/dolphin-drive-website/` in 1–2 minutes.

## Use dolphindrive.band

1. **Settings → Pages → Custom domain:** enter `dolphindrive.band`, Save (this adds a `CNAME` file to the repo).
2. At your domain registrar, set DNS:
   - `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www`: `<your-username>.github.io`
3. Once the DNS check passes, tick **Enforce HTTPS**.
4. Only cancel Bandzoogle after the new site loads on the domain.
