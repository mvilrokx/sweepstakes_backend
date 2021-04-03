const tournamentGroupService = require("../services/tournamentGroupService.js");

const index = async (req, res, next) => {
  try {
    res.json(await tournamentGroupService.index(req.params?.tournament_id));
  } catch (error) {
    return next(error);
  }
};

module.exports = { index };
