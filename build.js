import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import matter from "gray-matter";
import { Marked } from "marked";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const POSTS = path.join(ROOT, "posts");
const SRC = path.join(ROOT, "src");
const OUT = path.join(ROOT, "dist");
const TRUNCATE = /<!--\s*truncate\s*-->|<truncate\s*\/?>/i;

const config = JSON.parse(fs.readFileSync(path.join(ROOT, "site.config.json"), "utf8"));
// "/" for xgp.github.io, "/<repo>/" for a project site.
const BASE = ("/" + (process.env.BASE_PATH || "").replace(/^\/+|\/+$/g, "") + "/").replace("//", "/");

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Relative links/images in markdown (e.g. "assets/foo.png") resolve from the site root.
const marked = new Marked({
  walkTokens(token) {
    if ((token.type === "link" || token.type === "image") && !/^([a-z]+:|\/|#)/i.test(token.href)) {
      token.href = BASE + token.href.replace(/^\.\//, "");
    }
  },
});

const formatDate = (d) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function loadPosts() {
  return fs
    .readdirSync(POSTS)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(POSTS, file), "utf8"));
      const date = new Date(data.date ?? file.slice(0, 10));
      const slug = data.slug ?? file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
      const authors = [].concat(data.authors ?? data.author ?? config.github);
      const [head, ...rest] = content.split(TRUNCATE);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date,
        authors,
        excerpt: marked.parse(head),
        truncated: rest.length > 0,
        html: marked.parse(content.replace(TRUNCATE, "")),
      };
    })
    .sort((a, b) => b.date - a.date);
}

const icons = {
  back: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`,
  light: `<svg class="icon-light" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`,
  dark: `<svg class="icon-dark" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`,
  system: `<svg class="icon-system" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  github: `<svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`,
};

const fontStack = (name) => `'${name}', ${config.fonts[name] ?? "serif"}`;
const fontLink = (name) =>
  `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(name).replace(/%20/g, "+")}:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap">`;

function fontHead() {
  const names = config.fontPicker
    ? Object.keys(config.fonts)
    : [...new Set([config.headingFont, config.bodyFont])];
  return [
    `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`,
    ...names.map(fontLink),
    `<style>:root{--font-heading:${fontStack(config.headingFont)};--font-body:${fontStack(config.bodyFont)}}</style>`,
  ].join("\n");
}

function fontPicker() {
  if (!config.fontPicker) return "";
  const options = Object.keys(config.fonts)
    .map((f) => `<option value="${esc(fontStack(f))}">${esc(f)}</option>`)
    .join("");
  return `<div class="font-picker">
  <label>Heading <select data-var="--font-heading">${options}</select></label>
  <label>Text <select data-var="--font-body">${options}</select></label>
</div>`;
}

const themeScript = fs.readFileSync(path.join(SRC, "theme.js"), "utf8");

function layout({ title, description, back, body }) {
  return `<!doctype html>
<html lang="en"${config.fontPicker ? " data-font-picker" : ""}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
${description ? `<meta name="description" content="${esc(description)}">` : ""}
<script>${themeScript}</script>
${fontHead()}
<link rel="alternate" type="application/rss+xml" title="${esc(config.title)}" href="${BASE}rss.xml">
<link rel="stylesheet" href="${BASE}style.css">
</head>
<body>
<header class="site-header">
  <div>${back ? `<a class="icon-link" href="${BASE}" aria-label="Back to home">${icons.back}</a>` : ""}</div>
  <div class="header-right">
    <button class="icon-link theme-toggle" type="button" aria-label="Toggle theme">${icons.light}${icons.dark}${icons.system}</button>
    <a class="icon-link" href="https://github.com/${esc(config.github)}" aria-label="GitHub">${icons.github}</a>
  </div>
</header>
<main>
${body}
</main>
${fontPicker()}
<script src="${BASE}site.js"></script>
</body>
</html>
`;
}

const postUrl = (post) => `${BASE}posts/${post.slug}/`;

const meta = (post) =>
  `<p class="meta"><time datetime="${post.date.toISOString().slice(0, 10)}">${formatDate(post.date)}</time> · ${post.authors
    .map((a) => `<a href="https://github.com/${esc(a)}">@${esc(a)}</a>`)
    .join(", ")}</p>`;

function renderPost(post) {
  return layout({
    title: `${post.title} · ${config.title}`,
    description: post.description,
    back: true,
    body: `<article>
<h1>${esc(post.title)}</h1>
${meta(post)}
<div class="content">
${post.html}
</div>
</article>`,
  });
}

const pageUrl = (n) => (n === 1 ? BASE : `${BASE}page/${n}/`);

function renderIndex(posts, page, pages) {
  const items = posts
    .map(
      (post) => `<article class="summary">
<h2><a href="${postUrl(post)}">${esc(post.title)}</a></h2>
${meta(post)}
<div class="content">
${post.excerpt}
</div>
${post.truncated ? `<p><a class="more" href="${postUrl(post)}">Read more →</a></p>` : ""}
</article>`,
    )
    .join('\n<hr class="divider">\n');
  const nav =
    pages > 1
      ? `<nav class="pagination">
  <span>${page > 1 ? `<a href="${pageUrl(page - 1)}">← Newer</a>` : ""}</span>
  <span>${page < pages ? `<a href="${pageUrl(page + 1)}">Older →</a>` : ""}</span>
</nav>`
      : "";
  return layout({ title: config.title, back: page > 1, body: items + nav });
}

// Feed readers need absolute URLs, including for links and images inside post HTML.
function renderRss(posts) {
  const origin = config.url.replace(/\/+$/, "");
  const absolute = (html) => html.replace(/(href|src)="\//g, `$1="${origin}/`);
  const cdata = (s) => `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
  const items = posts
    .map((post) => {
      const link = origin + postUrl(post);
      return `  <item>
    <title>${esc(post.title)}</title>
    <link>${link}</link>
    <guid isPermaLink="true">${link}</guid>
    <pubDate>${post.date.toUTCString()}</pubDate>
${post.authors.map((a) => `    <dc:creator>@${esc(a)}</dc:creator>`).join("\n")}
    <description>${cdata(post.description || absolute(post.excerpt))}</description>
    <content:encoded>${cdata(absolute(post.excerpt))}</content:encoded>
  </item>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
  <title>${esc(config.title)}</title>
  <link>${origin}${BASE}</link>
  <description>${esc(config.description)}</description>
  <language>en</language>
  <atom:link href="${origin}${BASE}rss.xml" rel="self" type="application/rss+xml"/>
  ${posts.length ? `<lastBuildDate>${posts[0].date.toUTCString()}</lastBuildDate>` : ""}
${items}
</channel>
</rss>
`;
}

function write(rel, content) {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  const posts = loadPosts();
  for (const post of posts) write(`posts/${post.slug}/index.html`, renderPost(post));

  const size = config.postsPerPage;
  const pages = Math.max(1, Math.ceil(posts.length / size));
  for (let n = 1; n <= pages; n++) {
    const html = renderIndex(posts.slice((n - 1) * size, n * size), n, pages);
    write(n === 1 ? "index.html" : `page/${n}/index.html`, html);
  }

  fs.copyFileSync(path.join(SRC, "style.css"), path.join(OUT, "style.css"));
  fs.copyFileSync(path.join(SRC, "site.js"), path.join(OUT, "site.js"));
  if (fs.existsSync(path.join(POSTS, "assets"))) {
    fs.cpSync(path.join(POSTS, "assets"), path.join(OUT, "assets"), { recursive: true });
  }
  write("rss.xml", renderRss(posts.slice(0, 10)));
  write(".nojekyll", "");
  console.log(`Built ${posts.length} post(s), ${pages} page(s) → dist/ (base ${BASE})`);
}

build();

if (process.argv.includes("--serve")) {
  const port = Number(process.env.PORT || 3000);
  const types = { ".html": "text/html", ".xml": "application/rss+xml", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp" };
  http
    .createServer((req, res) => {
      let file = path.join(OUT, decodeURIComponent(req.url.split("?")[0]));
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
      if (!file.startsWith(OUT) || !fs.existsSync(file)) {
        res.writeHead(404).end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream" });
      fs.createReadStream(file).pipe(res);
    })
    .listen(port, () => console.log(`Serving http://localhost:${port}`));

  let timer;
  for (const dir of [POSTS, SRC]) {
    fs.watch(dir, { recursive: true }, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          build();
        } catch (e) {
          console.error(e);
        }
      }, 100);
    });
  }
}
