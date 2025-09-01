// middlewares/trimSymbol.js
function trimSymbol(obj, seen = new WeakSet()) {
  if (!obj || typeof obj !== "object") return obj;

  // avoid circular references
  if (seen.has(obj)) return obj;
  seen.add(obj);

  if (Array.isArray(obj)) {
    return obj.map((item) => trimSymbol(item, seen));
  }

  const newObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key === "symbol" && typeof obj[key] === "string") {
        newObj[key] = obj[key].split(":").pop();
      } else {
        newObj[key] = trimSymbol(obj[key], seen);
      }
    }
  }
  return newObj;
}

module.exports = function symbolMiddleware(req, res, next) {
  const oldJson = res.json;

  res.json = function (data) {

    let cleaned;
    try {
      cleaned = trimSymbol(data);
    } catch (err) {
      console.error("[Symbol Middleware] Error:", err.message);
      cleaned = data; // fallback to unmodified response
    }

    return oldJson.call(this, cleaned);
  };

  next();
};