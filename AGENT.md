# AGENT.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project goal

This repo reconstructs the XBoard Admin frontend from the original minified build. The priority is rebuilding behavior and UI as close to the original minified app as practical, not redesigning the product.

Use `minify/` as the primary source of truth when implementing routes, UI, logic, data shapes, and behavior. If the source is unclear, infer the closest likely behavior instead of blocking, but keep the implementation easy to adjust once the minified behavior is confirmed.

## Commands

Run commands from the repo root unless noted.

- Install deps: `cd source && npm install`
- Dev server: `cd source && npm run dev`
- Build only: `cd source && npm run build`
- Full local build: `build.bat`
- Preview built output after build: `cd source && npm run preview` or `npx serve dist`
- Deploy built admin assets: `deploy.bat`

There is currently no lint or test script in `source/package.json`; do not claim tests/lint passed unless scripts are added and run.

Expected verification for completed implementation work:

1. Run `build.bat` to produce `dist/`.
2. Run `deploy.bat` to copy `dist` into `\\wsl.localhost\Ubuntu-22.04\www\wwwroot\xb.test\public\assets`, replacing the old `admin` folder with the new build.
3. Manually check the affected admin route against `http://xb.test/admin123` when UI behavior changed.

`deploy.bat` is allowed to be edited when needed for the task.

## Architecture

The active source app lives under `source/`. Root-level `dist/` is generated output; `minify/` is the original minified reference; `api.md` tracks rebuilt routes and API endpoints.

This is a React 18 + Vite app. `source/main.jsx` mounts `App` inside `I18nProvider` and imports global CSS from `source/assets/styles/index.css`.

Routing is custom hash routing, not `react-router`. `source/router/index.js` parses and writes `window.location.hash`, exposes navigation helpers, public auth paths, redirect helpers, and a subscription API. Components consume it through `useHashLocation()`.

Authentication state is a small external store in `source/store/auth.js`, exposed through `useSyncExternalStore`. The token key is `access_token` in browser storage. `useAuthGuard()` redirects unauthenticated users away from non-public routes. `App` currently routes auth paths to `SignInView` and other authenticated paths to `HomeView`.

HTTP calls go through `source/api/http.js`. `requestJson()` builds URLs from `window.settings.base_url` plus `/api/v2`, sends JSON by default, includes `Content-Language` from `localStorage.i18nextLng`, optionally sets `Authorization`, and throws `HttpError` on non-2xx responses. Auth endpoints are wrapped in `source/api/auth.js`.

i18n is custom. `source/i18n/index.js` provides `I18nProvider`, `useTranslation()`, fallback messages, language selection, dynamic imports from `source/i18n/locales/*.js`, and optional `window.XBOARD_TRANSLATIONS` overrides. The locale JS files are already translated; reuse their strings rather than translating new text manually unless the source locale lacks the needed key.

Vite config in `source/vite.config.js` uses `base: './'`, emits to `../dist`, writes a manifest, and configures esbuild so JSX can be parsed in `.js` files. `build.bat` runs the Vite build, copies locale files into `dist/locales`, then moves `.vite/manifest.json` to `dist/manifest.json`.

## Rebuild workflow

For new screens/routes:

1. Inspect `index.unminify/` first, especially unminified assets when available.
2. Use `api.md` to identify the target route/API coverage.
3. Add source under the existing structure: shared UI in `source/components/`, hooks in `source/composables/`, API wrappers in `source/api/`, pages in `source/views/`.
4. Wire routes through the custom router/App flow; do not add a routing library unless explicitly requested.
5. Reuse locale keys from `source/i18n/locales/*.js`.
6. Update `api.md` only when a route or endpoint is completed enough to be usable.

Build output only needs to remain compatible with deployment and the original admin asset layout; it does not need to be byte-for-byte identical to `minify/`.
