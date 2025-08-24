function uniq(arr) {
  return [...new Set(arr.filter(Boolean))];
}

function diff(all, exclude) {
  const ex = new Set(exclude);
  return all.filter((s) => !ex.has(s));
}

module.exports = { uniq, diff };