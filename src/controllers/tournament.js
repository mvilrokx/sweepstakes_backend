const tournamentService = require("../services/tournamentService.js");

const show = async (req, res, next) => {
  try {
    res.json(await tournamentService.show(req.params?.tournamentId));
  } catch (error) {
    return next(error);
  }
};

const index = async (req, res, next) => {
  try {
    res.json(await tournamentService.index());
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
    res.json({ ...(await tournamentService.create(req.body)) });
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    res.json({
      ...(await tournamentService.update(req.params?.tournamentId, req.body)),
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { show, index, destroy, create, update };
