export async function handler(event, context) {
  const apiKey = process.env.TWELVEDATA_API_KEY;

  if (!apiKey) {
    console.error("clé API non présentée");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "clé API non présentée" })
    };
  }

  try {
    const nvdaRes = await fetch(`https://api.twelvedata.com/price?symbol=NVDA&apikey=${apiKey}`);
    const nvdaData = await nvdaRes.json();

    const usdchfRes = await fetch(`https://api.twelvedata.com/price?symbol=USD/CHF&apikey=${apiKey}`);
    const usdchfData = await usdchfRes.json();

    console.log("✅ NVDA data:", nvdaData);
    console.log("✅ USDCHF data:", usdchfData);

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
      body: JSON.stringify({ error: 'n-a pas reussi à trouver les valeur' })
    };
  }
}

