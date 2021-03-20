const userService = require("../services/userService.js");

const show = async (req, res, next) => {
  try {
    res.json(await userService.show(req.params?.userId));
  } catch (error) {
    return next(error);
  }
};

const index = async (req, res, next) => {
  try {
    res.json(await userService.index());
  } catch (error) {
    return next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    await userService.destroy(req.params?.userId);
    res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

const create = async (req, res, next) => {
  try {
    res.json({ ...(await userService.create(req.body)) });
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    res.json({
      ...(await userService.update(req.params?.userId, req.body)),
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { show, index, destroy, create, update };
