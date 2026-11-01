export async function onRequest() {
  const NPOINT = 'https://api.npoint.io/cd45816ccf83cda565d1';
  const SITE = 'https://mobilerhatbd.pages.dev';
  let phones = [];
  try {
    let r = await fetch(NPOINT);
    if(r.ok) phones = await r.json();
  } catch(e){}
  
  let urls = [`<url><loc>${SITE}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`];
  let today = new Date().toISOString().split('T')[0];
  
  phones.forEach(p => {
    if(p.id) {
      urls.push(`<url><loc>${SITE}/phone.html?id=${p.id}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`);
    }
  });
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`;
  
  return new Response(xml, { headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' } });
}
