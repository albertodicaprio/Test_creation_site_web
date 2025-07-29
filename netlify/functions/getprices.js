const fetch = require('node-fetch');

exports.handler = async function () {
  const API_KEY = process.env.TWELVEDATA_API_KEY;

  const symbols = ['NVDA', 'GOOGL', 'USD/CHF'];

  const urls = {
    nvda: `https://api.twelvedata.com/price?symbol=NVDA&apikey=${API_KEY}`,
    googl: `https://api.twelvedata.com/price?symbol=GOOGL&apikey=${API_KEY}`,
    usdchf: `https://api.twelvedata.com/price?symbol=USD/CHF&apikey=${API_KEY}`
  };

  try {
    const [nvdaRes, googlRes, fxRes] = await Promise.all([
      fetch(urls.nvda).then(r => r.json()),
      fetch(urls.googl).then(r => r.json()),
      fetch(urls.usdchf).then(r => r.json())
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        currentPrice: nvdaRes.price,
        googlPrice: googlRes.price,
        usdchf: fxRes.price
      })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Fetch failed' }) };
  }
};
