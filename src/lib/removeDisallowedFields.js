module.exports = (...allowedKeys) => (...objs) => {
  const sanitzedObjs = objs.map(obj =>
    allowedKeys.reduce(
      (reducedObj, key) => ({ ...reducedObj, [key]: obj[key] }),
      {}
    )
  );
  return sanitzedObjs.length === 1 ? sanitzedObjs[0] : sanitzedObjs;
};
