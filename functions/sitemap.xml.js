export async function onRequest(context) {
  const NPOINT = 'https://api.npoint.io/cd45816ccf83cda565d1';
  let phones = [];
  try {
    let r = await fetch(NPOINT);
    phones = await r.json();
  } catch(e) {}
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://mobilerhatbd.pages.dev/</loc><lastmod>2026-11-01</lastmod><priority>1.0</priority></url>`;
  phones.forEach(p => {
    xml += `
  <url>
    <loc>https://mobilerhatbd.pages.dev/phone.html?id=${p.id}</loc>
    <lastmod>2026-11-01</lastmod>
    <priority>0.8</priority>
  </url>`;
  });
  xml += `\n</urlset>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
    }
