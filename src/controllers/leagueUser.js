const leagueUserService = require("../services/leagueUserService.js");

// const show = async (req, res, next) => {
//   try {
//     res.json(await leagueUserService.show(req.params?.league_id));
//   } catch (error) {
//     return next(error);
//   }
// };

// const index = async (req, res, next) => {
//   try {
//     res.json(await leagueUserService.index(req.params?.tournament_id));
//   } catch (error) {
//     return next(error);
//   }
// };

// const destroy = async (req, res, next) => {
//   try {
//     await leagueUserService.destroy(req.params?.league_id);
//     res.sendStatus(204);
//   } catch (error) {
//     return next(error);
//   }
// };

const create = async (req, res, next) => {
  try {
    console.log("req.params = ", req.params);
    res.json({
      ...(await leagueUserService.create(req.user?.id, req.params)),
    });
  } catch (error) {
    return next(error);
  }
};

// const update = async (req, res, next) => {
//   try {
//     res.json({
//       ...(await leagueUserService.update(req.params?.league_id, req.body)),
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

// module.exports = { show, index, destroy, create, update };
module.exports = { create };
