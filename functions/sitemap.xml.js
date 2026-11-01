export async function onRequest() {
  const NPOINT = "https://api.npoint.io/cd45816ccf83cda565d1";
  let phones = [];
  try {
    let r = await fetch(NPOINT);
    phones = await r.json();
    if (!Array.isArray(phones)) phones = phones.data || [];
  } catch(e) {}

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  xml += `  <url><loc>https://mobilerhatbd.pages.dev/</loc><lastmod>2026-11-01</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>\n`;
  
  phones.forEach(p => {
    xml += `  <url><loc>https://mobilerhatbd.pages.dev/phone.html?id=${p.id}</loc><lastmod>2026-11-01</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
  });
  
  xml += `</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" }
  });
      }
