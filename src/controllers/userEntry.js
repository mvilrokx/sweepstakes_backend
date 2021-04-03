const userEntryService = require("../services/userEntryService.js");

const create = async (req, res, next) => {
  try {
    res.json({
      ...(await userEntryService.create(req.params, req.body)),
    });
  } catch (error) {
    return next(error);
  }
};

const show = async (req, res, next) => {
  try {
    res.json(await userEntryService.show(req.params));
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    res.json(await userEntryService.update(req.params, req.body));
  } catch (error) {
    return next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    await userEntryService.destroy(req.params?.user_entry_id);
    res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

module.exports = { create, show, update, destroy };
