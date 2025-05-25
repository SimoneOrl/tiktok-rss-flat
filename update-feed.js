const fs = require('fs');
const axios = require('axios');
const xml2js = require('xml2js');

const username = 'eikdrawing'; // cambia con l'username TikTok
const feedFile = 'feeds/eikdrawing.xml';

async function fetchTikTokVideos() {
  // Qui puoi usare un'API pubblica o scraping (limitato)
  // Per esempio usiamo un servizio che restituisce JSON dei video (fittizio)
  const url = `https://www.tiktok.com/@${username}`;
  // ATTENZIONE: TikTok non ha API ufficiale per questo, quindi serve una fonte esterna

  // Per esempio, qui useremo un mock di dati:
  return [
    { id: '123', title: 'Video 1', link: 'https://www.tiktok.com/@eikdrawing/video/123' },
    { id: '124', title: 'Video 2', link: 'https://www.tiktok.com/@eikdrawing/video/124' },
  ];
}

async function buildFeed(videos) {
  const builder = new xml2js.Builder({ rootName: 'rss', xmldec: { version: '1.0', encoding: 'UTF-8' } });

  const feed = {
    $: { version: '2.0' },
    channel: {
      title: `TikTok videos di ${username}`,
      link: `https://www.tiktok.com/@${username}`,
      description: `Feed RSS di TikTok di ${username}`,
      item: videos.map(v => ({
        title: v.title,
        link: v.link,
        guid: v.id,
        pubDate: new Date().toUTCString(),
      })),
    },
  };

  return builder.buildObject(feed);
}

async function updateFeed() {
  try {
    const videos = await fetchTikTokVideos();
    const xml = await buildFeed(videos);

    fs.writeFileSync(feedFile, xml, 'utf8');
    console.log('Feed aggiornato con successo!');
  } catch (e) {
    console.error('Errore aggiornamento feed:', e);
  }
}

updateFeed();
