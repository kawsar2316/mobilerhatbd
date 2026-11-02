export async function onRequest() {
  const NPOINT = 'https://api.npoint.io/cd45816ccf83cda565d1';
  let phones = [];
  try {
    const r = await fetch(NPOINT, { cf: { cacheTtl: 3600 } });
    if (r.ok) {
      const data = await r.json();
      if (Array.isArray(data)) phones = data;
    }
  } catch(e) {
    // npoint fail korleo sitemap cholbe
  }
  const today = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  xml += `  <url><loc>https://mobilerhatbd.pages.dev/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>\n`;
  phones.forEach(p => {
    if(p && p.id){
      const id = String(p.id).replace(/[^a-zA-Z0-9-_]/g, '');
      xml += `  <url><loc>https://mobilerhatbd.pages.dev/phone.html?id=${id}</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>\n`;
    }
  });
  xml += '</urlset>';
  return new Response(xml, { 
    headers: { 
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    } 
  });
}
