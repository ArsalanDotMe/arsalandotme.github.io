import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

const article = readFileSync('_site/posts/reducing-cloud-spend-at-edgio/index.html', 'utf8');
assert.equal((article.match(/<h1\b/g) || []).length, 1);
assert.equal((article.match(/<figure class="diagram">/g) || []).length, 4);
assert(article.includes('logs:PutLogEvents'));
assert(article.includes('/assets/posts/Lambda-Extensions-Overview.png'));
assert(!article.includes('jekyll-theme-chirpy'));
for (const path of ['index.html', 'about/index.html', 'archives/index.html', '404.html']) {
  const html = readFileSync(`_site/${path}`, 'utf8');
  assert(html.includes('/assets/css/portfolio.css'), `${path} must use the shared design`);
  assert(!html.includes('jekyll-theme-chirpy'));
}
for (const path of ['categories', 'tags']) {
  assert(readFileSync(`_site/${path}/index.html`, 'utf8').includes('content="0;url=/archives/"'));
}
for (const path of ['feed.xml', 'sitemap.xml', 'career/index.html', 'career/privacy/index.html']) {
  assert(existsSync(`_site/${path}`), `${path} must survive the migration`);
}

const events = {};
const deleted = [];
let skipped = false, claimed = false, unregistered = false, activated;
vm.runInNewContext(readFileSync('sw.min.js', 'utf8'), {
  self: {
    addEventListener: (name, handler) => { events[name] = handler; },
    skipWaiting: () => { skipped = true; },
    clients: { claim: async () => { claimed = true; } },
    registration: { unregister: async () => { unregistered = true; } }
  },
  caches: {
    keys: async () => ['chirpy-old', 'chirpy-new', 'unrelated-cache'],
    delete: async name => { deleted.push(name); }
  }
});
events.install();
events.activate({ waitUntil: work => { activated = work; } });
await activated;
assert(skipped && claimed && unregistered);
assert.deepEqual(deleted, ['chirpy-old', 'chirpy-new']);
assert(!events.fetch, 'The retired worker must not intercept requests');
console.log('Article, routes, shared design, feeds, and old-cache retirement passed.');
