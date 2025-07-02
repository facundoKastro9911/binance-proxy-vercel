export default async function handler(req, res) {
  try {
    const symbol = req.query.symbol?.toUpperCase() || "BTCUSDT";
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });

    const data = await response.json();
    if (!data.price) throw new Error("No se recibió precio");

    res.status(200).json({ price: data.price });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener precio", detalle: error.message });
  }
}
