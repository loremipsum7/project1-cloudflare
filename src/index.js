export default {
  async fetch(request) {
    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>My Cloudflare Hello</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    .card { max-width: 560px; padding: 1rem 1.25rem; border: 1px solid #ddd; border-radius: 12px; }
    h1 { margin: 0 0 .5rem 0; }
    p { color:#555 }
    a { text-decoration: none; }
    button { padding: .6rem 1rem; border:1px solid #ccc; border-radius:10px; cursor:pointer; }
  </style>
</head>
<body>
  <div class="card">
    <h1>It works!</h1>
    <p>This page is served by a <strong>Cloudflare Worker</strong> from my GitHub repo.</p>
    <p>Try the API route too: <a href="/api/ping">/api/ping</a></p>
    <button onclick="location.reload()">Reload</button>
  </div>
</body>
</html>`;
    const { pathname } = new URL(request.url);
    if (pathname === "/api/ping") {
      return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }
    return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
  }
};
