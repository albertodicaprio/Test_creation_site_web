export async function handler(event, context) {
  try {
    const nvdaRes = await fetch(`https://api.twelvedata.com/price?symbol=NVDA&apikey=${process.env.TWELVE_API_KEY}`);
    const nvdaData = await nvdaRes.json();

    const usdchfRes = await fetch(`https://api.twelvedata.com/price?symbol=USD/CHF&apikey=${process.env.TWELVE_API_KEY}`);
    const usdchfData = await usdchfRes.json();

    console.log("NVDA data:", nvdaData);
    console.log("USDCHF data:", usdchfData);

    return {
      statusCode: 200,
      body: JSON.stringify({
        currentPrice: nvdaData.price,
        usdchf: usdchfData.price
      })
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
}

