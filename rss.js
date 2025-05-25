(async () => {
  const res = await fetch('https://rss.app/feeds/0qesnZU4bYs9UEhQ.xml');
  const xmlText = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "text/xml");
  const items = xml.querySelectorAll("item");

  const result = [];
  items.forEach(item => {
    result.push({
      title: item.querySelector("title")?.textContent,
      link: item.querySelector("link")?.textContent,
      description: item.querySelector("description")?.textContent
    });
  });

  console.log(JSON.stringify(result, null, 2));
})();
