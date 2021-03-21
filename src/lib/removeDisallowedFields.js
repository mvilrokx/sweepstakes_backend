module.exports = (...allowedKeys) => (...obj) => {
  const sanitzedObj = obj.map(o =>
    allowedKeys.reduce(
      (reducedObj, key) => ({ ...reducedObj, [key]: o[key] }),
      {}
    )
  );
  return sanitzedObj.length === 1 ? sanitzedObj[0] : sanitzedObj;
};
