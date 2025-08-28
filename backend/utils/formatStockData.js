function formatStockData(stock) {
  if (!stock) return null;

  const { price = 0, priceopen = 0 } = stock;
  const change = price - priceopen;

  return {
    symbol: stock.symbol,
    name: stock.name,
    category: stock.category,
    price,
    priceopen,
    high: stock.high,
    low: stock.low,
    volume: stock.volume,
    dataDelay: stock.dataDelay,
    updatedAt: stock.updatedAt,
    change,
  };
}

module.exports = formatStockData;

