const entryPickService = require("../services/entryPickService.js");

const index = async (req, res, next) => {
  try {
    res.json(await entryPickService.index(req.params));
  } catch (error) {
    return next(error);
  }
};

const create = async (req, res, next) => {
  try {
    res.json({
      ...(await entryPickService.create(req.params, req.body)),
    });
  } catch (error) {
    return next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    await entryPickService.destroy(req.params?.entry_pick_id);
    res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    res.json({
      ...(await entryPickService.update(req.params?.entry_pick_id, req.body)),
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { index, create, destroy, update };
