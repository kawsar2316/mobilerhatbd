export async function onRequestGet() {
  const API = 'https://api.npoint.io/cd45816ccf83cda565d1';
  let phones = [];
  try {
    const r = await fetch(API);
    if(r.ok) phones = await r.json();
  } catch(e){}
  const date = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  xml += `<url><loc>https://mobilerhatbd.pages.dev/</loc><lastmod>${date}</lastmod></url>\n`;
  for(let p of phones){
    if(!p.id) continue;
    xml += `<url><loc>https://mobilerhatbd.pages.dev/phone.html?id=${encodeURIComponent(p.id)}</loc><lastmod>${date}</lastmod></url>\n`;
  }
  xml += `</urlset>`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'no-cache'
    }
  });
}
