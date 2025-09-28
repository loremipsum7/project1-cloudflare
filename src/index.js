let count = 0; // in-memory (resets on redeploy/idle)

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const { pathname } = url;

    // --- API: read current value
    if (request.method === "GET" && pathname === "/api/counter") {
      return json({ count });
    }

    // --- API: increment
    if (request.method === "POST" && pathname === "/api/increment") {
      count += 1;
      return json({ ok: true, count });
    }

    // --- API: reset
    if (request.method === "POST" && pathname === "/api/reset") {
      count = 0;
      return json({ ok: true, count });
    }

    // --- Simple page
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
    button { padding: .6rem 1rem; border:1px solid #ccc; border-radius:10px; cursor:pointer; }
    .row { display:flex; gap:.5rem; margin:.75rem 0; }
    code { background:#f6f6f6; padding:.1rem .35rem; border-radius:6px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Counter demo</h1>
    <p>Count: <strong id="count">—</strong></p>
    <div class="row">
      <button id="inc">Increment</button>
      <button id="reset">Reset</button>
      <button id="refresh">Refresh</button>
    </div>
    <p>API test links: <a href="/api/counter">/api/counter</a></p>
  </div>
  <img src="https://placekitten.com/300/200" alt="Kitten" />
 <img src="  https://imgflip.com/i/1ey23i" alt="Kitten" />

  <script>
    async function refresh() {
      const r = await fetch('/api/counter');
      const j = await r.json();
      document.getElementById('count').textContent = j.count;
    }
    async function post(path) {
      const r = await fetch(path, { method: 'POST' });
      if (!r.ok) alert('Request failed: ' + r.status);
      await refresh();
    }
    document.getElementById('inc').onclick = () => post('/api/increment');
    document.getElementById('reset').onclick = () => post('/api/reset');
    document.getElementById('refresh').onclick = refresh;
    refresh();
  </script>
</body>
</html>`;
    return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
  }
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}
