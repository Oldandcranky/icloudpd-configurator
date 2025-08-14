# iCloudPD Configurator (Vite + React + TS)

A self-contained GUI to generate `docker-compose.yaml` and `icloudpd.conf` for the `boredazfcuk/icloudpd` image. No external UI library required.

## Quick start (Local)

1. Unzip the archive.
2. Open a terminal in the project folder.
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open `http://localhost:5173/`.

## Deploy to GitHub Pages

1. Create a GitHub repo (e.g., `icloudpd-configurator`) and push this folder.
2. The Vite `base` is already set to `/icloudpd-configurator/` in `vite.config.ts`.
3. GitHub Actions workflow is included at `.github/workflows/deploy.yml`.
4. In your repo: **Settings → Pages → Source: GitHub Actions**.
5. Push to `main` and the site will build & publish automatically.

## Build locally (optional)

```bash
npm run build
npm run preview
```
