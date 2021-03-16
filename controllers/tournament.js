const tournamentService = require("../services/tournamentService.js");

const show = async (req, res, next) => {
  try {
    const result = await tournamentService.show(req.params?.tournamentId);
    res.json(result.body);
  } catch (error) {
    return next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await tournamentService.index();
    res.json(result.body);
  } catch (error) {
    return next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tournamentService.destroy(req.params?.tournamentId);
    res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await tournamentService.create(req.body);
    if (result.success) {
      res.json(result.body);
    } else {
      return next({
        status: 400,
        message: result.error.detail,
        stack: result.error.stack,
      });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { show, index, destroy, create };
