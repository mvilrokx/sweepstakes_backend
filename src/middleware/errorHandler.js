module.exports = (error, req, res, next) => {
  res.status(error.status || 500); // TODO: Fix this
  res.json({
    status: error.status,
    message: error.message,
    stack:
      process.env.NODE_ENV || "development" === "development"
        ? error.stack
        : "",
  });
};
