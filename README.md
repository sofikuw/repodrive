# RepoDrive 0.1.5

RepoDrive is a browser-first cloud-storage UI that uses GitHub repositories as storage.

## 0.1.5 fixed release

This build keeps the proven 0.1.4 GitHub Device Flow instead of the broken `/api/auth/login` + callback flow.

### Authentication flow

1. Browser calls `POST /api/device-code`.
2. Vercel Edge Function proxies GitHub's device-code endpoint.
3. User approves RepoDrive on GitHub.
4. Browser polls `POST /api/poll-token`.
5. GitHub returns an access token.
6. RepoDrive calls `api.github.com` directly with that token.

The public GitHub App Client ID is stored in `config.js`. No GitHub App private key or client secret belongs in this repository.

## Important GitHub App settings

- Enable **Device Flow** in the GitHub App settings.
- Grant the repository permissions RepoDrive needs.
- Install the App on your account and grant access to the repositories you want, including private repositories.

## Deploy to Vercel

Deploy the **contents of this package root**. Do not deploy the ZIP file itself as a nested directory and do not set a subdirectory as the Vercel root.

There is no build command required.

After deployment, test:

`/api/health`

It should return JSON containing `ok: true` and version `0.1.5`.

Then open the main site and click **Continue with GitHub**.

## Compatibility fix

`/api/auth/login` redirects to the new device-flow login entry point, so an older cached frontend cannot hit the previous 404 endpoint forever. `/api/auth/callback` also redirects safely to the application root.

## Client ID

The Client ID in this release matches the working 0.1.4 configuration. The API functions also accept the client ID from the browser and fall back to `GITHUB_APP_CLIENT_ID` or `GITHUB_CLIENT_ID` if present.

## Logo

The supplied RepoDrive logo is included as transparent `assets/logo-header.png` and `assets/logo-mark.png`, and the header now renders the actual logo instead of the placeholder diamond.
