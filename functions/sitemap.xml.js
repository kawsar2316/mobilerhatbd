export async function onRequest() {
  const NPOINT = 'https://api.npoint.io/cd45816ccf83cda565d1';
  let phones = [];
  try {
    const r = await fetch(NPOINT);
    if(r.ok) phones = await r.json();
  } catch(e) {}
  
  const today = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  xml += `<url><loc>https://mobilerhatbd.pages.dev/</loc><lastmod>${today}</lastmod></url>\n`;
  
  if(Array.isArray(phones)){
    phones.forEach(p => {
      if(p && p.id){
        xml += `<url><loc>https://mobilerhatbd.pages.dev/phone.html?id=${p.id}</loc><lastmod>${today}</lastmod></url>\n`;
      }
    });
  }
  xml += '</urlset>';
  
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' }
  });
}
