export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/ping") {
      return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>My Cloudflare Hello</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    .card { max-width: 560px; padding: 1rem 1.25rem; border: 1px solid #ddd; border-radius: 12px; }
    h1 { margin: 0 0 .5rem 0; } p { color:#555 }
  </style>
</head>
<body>
  <div class="card">
    <h1>It works (my code)!</h1>
    <p>Served by a <strong>Cloudflare Worker</strong> from GitHub.</p>
    <p>API test: <a href="/api/ping">/api/ping</a></p>
  </div>
</body>
</html>`;
    return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
  }
};
