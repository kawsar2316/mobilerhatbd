export async function onRequest() {
  const API = 'https://api.npoint.io/cd45816ccf83cda565d1';
  let phones = [];
  try {
    const res = await fetch(API);
    phones = await res.json();
  } catch(e) {}

  let urlList = '';
  phones.forEach(p => {
    urlList += `<url><loc>https://mobilerhatbd.pages.dev/phone.html?id=${p.id}</loc></url>\n`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://mobilerhatbd.pages.dev/</loc></url>
  <url><loc>https://mobilerhatbd.pages.dev/all-phones.html</loc></url>
  ${urlList}
</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
