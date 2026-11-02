export async function onRequestGet() {
  const API = 'https://api.npoint.io/cd45816ccf83cda565d1';
  let phones = [];
  try {
    let r = await fetch(API);
    if (r.ok) {
      phones = await r.json();
    }
  } catch (e) {
    console.error("Sitemap fetch error:", e);
  }
  const currentDate = new Date().toISOString().split('T')[0];
  let urls = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mobilerhatbd.pages.dev/</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>1.0</priority>
  </url>`;
  if (Array.isArray(phones)) {
    for (let p of phones) {
      if (!p.id) continue;
      const cleanId = encodeURIComponent(p.id);
      urls += `
  <url>
    <loc>https://mobilerhatbd.pages.dev/phone.html?id=${cleanId}</loc>
    <lastmod>${currentDate}</lastmod>
  </url>`;
    }
  }
  urls += `\n</urlset>`;
  return new Response(urls, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
