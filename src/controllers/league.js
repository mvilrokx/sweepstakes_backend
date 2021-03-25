const leagueService = require("../services/leagueService.js");

const show = async (req, res, next) => {
  try {
    res.json(await leagueService.show(req.params?.league_id));
  } catch (error) {
    return next(error);
  }
};

const index = async (req, res, next) => {
  try {
    res.json(await leagueService.index(req.params?.tournament_id));
  } catch (error) {
    return next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    await leagueService.destroy(req.params?.league_id);
    res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

const create = async (req, res, next) => {
  try {
    res.json({
      ...(await leagueService.create(req.params?.tournament_id, req.body)),
    });
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    res.json({
      ...(await leagueService.update(req.params?.league_id, req.body)),
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { show, index, destroy, create, update };
