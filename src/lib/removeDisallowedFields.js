module.exports = (obj, allowedKeys) =>
  allowedKeys.reduce(
    (reducedObj, key) => ({ ...reducedObj, [key]: obj[key] }),
    {}
  );
