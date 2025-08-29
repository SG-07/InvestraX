function formatStockData(stock) {
  if (!stock) return null;

  return {
    symbol: stock.symbol,
    name: stock.name,
    category: stock.category || "",
    price: stock.price,
    priceopen: stock.priceopen,
    high: stock.high,
    low: stock.low,
    volume: stock.volume,
    datadelay: stock.datadelay,
    tradetime: stock.tradetime,
    change: stock.change,
    changepct: stock.changepct,   
    low52: stock.low52,
    high52: stock.high52,
    eps: stock.eps,
    pe: stock.pe,
    marketcap: stock.marketcap,
  };
}

module.exports = formatStockData;
