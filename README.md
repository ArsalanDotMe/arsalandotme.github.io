# Arsalan Ahmad's website

Personal portfolio and writing at https://arsalan.me, built with Jekyll and a shared local layout. The homepage, About page, writing index, article, and 404 page use the same design.

## Local preview

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1 --port 4040
```

## Verification

```sh
bash tools/test.sh
```

This builds the site, checks internal links and assets, and verifies the original article, legacy routes, feed, and service-worker retirement.

## Article diagrams

The original Mermaid definitions live beside the rendered SVGs in `assets/posts/edgio/`. SVGs are checked in so the public site needs no diagram runtime. To regenerate a diagram with Mermaid CLI:

```sh
npx --package @mermaid-js/mermaid-cli mmdc -i assets/posts/edgio/architecture-1.mmd -o assets/posts/edgio/architecture-1.svg -c tools/mermaid-config.json -b transparent
```

The article remains at `/posts/reducing-cloud-spend-at-edgio/`. Writing uses `/archives/`; the old category and tag routes redirect there. The original private career information and privacy pages remain at their existing URLs.

`sw.min.js` retires the former theme's offline worker and removes only its `chirpy-` caches. Keep that URL available for returning visitors.

GitHub Pages deployment runs only when changes are pushed to the configured main branch or the deployment workflow is manually triggered.
