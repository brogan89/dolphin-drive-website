# Dolphin Drive website

Static site (plain HTML/CSS/JS, no build step) for GitHub Pages.

## Update the site

Everything you'll normally change is in `data.js`:

- **Add a show:** add an entry to `SHOWS`. Date format is `"YYYY-MM-DDTHH:MM"` in NZ time. A show disappears 24 hours after its start time, and the Shows section hides itself when none are left.
- **Add a single:** put the cover art in `assets/img/`, then add it to `SINGLES`. Cards link to Spotify; demos live on Demoify, so there's nothing to upload here.
- **Add photos:** put them in `assets/img/gallery/` and add the filename to `PHOTOS`.

Commit and push. The live site updates in about a minute.

Images are stored with [Git LFS](https://git-lfs.com) (see `.gitattributes`). Run `git lfs install` once on any machine before cloning.

## Preview locally

```bash
just run
```

Serves the site on http://localhost:8420 and opens it in your browser. `just run 9000` uses another port. Ctrl+C stops it. (Needs [just](https://github.com/casey/just): `brew install just`.)

## First-time deploy to GitHub Pages

1. Create an empty public repo on GitHub, e.g. `dolphin-drive-website`.
2. Push this folder to it:
   ```bash
   git init && git add . && git commit -m "Dolphin Drive website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/dolphin-drive-website.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions.** The workflow in `.github/workflows/pages.yml` deploys every push to `main`. (Don't use "Deploy from a branch": it serves Git LFS pointer files instead of the real audio and images.)
4. Site goes live at `https://<your-username>.github.io/dolphin-drive-website/` in 1–2 minutes.

## Custom domain: dolphindrive.band

GitHub side is set (Settings → Pages → Custom domain). No `CNAME` file needed with Actions deploys.

DNS for dolphindrive.band is hosted by Bandzoogle (nameservers `dns1-4.sitezoogle.com`). In Bandzoogle's domain/DNS settings:

- `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (remove the old `172.65.197.38` A and the AAAA record)
- `CNAME` record for `www`: `brogan89.github.io`

Then tick **Enforce HTTPS** in Settings → Pages once the DNS check passes.

If Bandzoogle is also the registrar, transfer the domain (or move DNS to another provider) before cancelling Bandzoogle, or the domain goes with it.
