# xgp blog

Markdown posts live in `posts/` (`YYYY-MM-DD-slug.md`), images in `posts/assets/` (reference them as `assets/foo.png`).
Put `<!-- truncate -->` where the homepage excerpt should end.

```md
---
title: "Post title"
date: 2026-09-26
authors: [xgp]
description: "Meta description"
---
```

- `npm run dev`: build, serve on http://localhost:3000 (`PORT=4173 npm run dev` to change), rebuild on change
- `npm run build`: build to `dist/`

Pushing to `main` builds and publishes `dist/` to the `gh-pages` branch.
Set `"fontPicker": false` in `site.config.json` once `headingFont`/`bodyFont` are chosen.
