# SillyDev2026 Portfolio

Static developer portfolio and Roblox documentation site, hosted on GitHub Pages.

## Pages

- Home, About, Projects, Links, Contact
- Roblox Hub with module search and pagination
- Roblox Games and Modules
- Roblox class/API documentation
- Bnum calculator with safe input parsing
- Luau benchmark **generator** (runs generated code in Roblox Studio, not the browser)

## Local development

Open the project with a static HTTP server from the repository root:

```sh
python3 -m http.server 8080
```

Open http://localhost:8080/. No Node build step, API keys, authentication, or external backend is required.

## Checks

Requires Python 3.9+ and Node 22+:

```sh
python3 scripts/check_site.py
node --test tests/bnum.test.cjs
node --check site.js
```

The GitHub Actions workflow runs these checks on push and pull requests.

## Deployment

GitHub Pages should publish the `main` branch from the repository root. This repository is a **project site**, so links remain relative and work under `/sillydev.github.io/`. If the repository is renamed or published through a different host, review the preview Open Graph URL in `index.html`.

## Design notes

- Shared `site-polish.css` and `site.js` standardize navigation and accessibility across legacy pages.
- Bnum uses a JavaScript-number mantissa and a **safe-integer exponent**, rather than arbitrary precision, so arithmetic can lose precision when magnitudes differ dramatically. Inputs and undefined operations are rejected with readable errors.
- The benchmark generator does not execute Lua input in the browser. Benchmark scripts must run in Roblox Studio for meaningful Luau timings.
- Some class pages include historical examples. They are documentation, not a replacement for testing those modules inside Roblox Studio.
