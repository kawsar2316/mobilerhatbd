export async function onRequestGet() {
  const API = 'https://api.npoint.io/cd45816ccf83cda565d1';
  let phones = [];
  try {
    let r = await fetch(API);
    phones = await r.json();
  } catch(e) {}

  let urls = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://mobilerhatbd.pages.dev/</loc><priority>1.0</priority></url>`;

  for (let p of phones) {
    if (!p.id) continue;
    urls += `\n  <url><loc>https://mobilerhatbd.pages.dev/phone.html?id=${p.id}</loc></url>`;
  }
  urls += `\n</urlset>`;

  return new Response(urls, {
    headers: { 
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'no-cache'
    }
  });
}
