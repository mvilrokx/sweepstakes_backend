const leagueService = require("../services/leagueService.js");

const show = async (req, res, next) => {
  try {
    res.json(await leagueService.show(req.params?.leagueId));
  } catch (error) {
    return next(error);
  }
};

const index = async (req, res, next) => {
  try {
    res.json(await leagueService.index(req.params?.tournamentId));
  } catch (error) {
    return next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    await leagueService.destroy(req.params?.leagueId);
    res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

const create = async (req, res, next) => {
  try {
    res.json({
      ...(await leagueService.create(req.params?.tournamentId, req.body)),
    });
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    res.json({
      ...(await leagueService.update(req.params?.leagueId, req.body)),
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { show, index, destroy, create, update };
