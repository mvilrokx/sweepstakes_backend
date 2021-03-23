const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Boom = require("@hapi/boom");
const { validationResult } = require("express-validator");

const userService = require("../services/userService");
const Logger = require("../lib/logger.js");
const {
  JwtTokenSecret,
  authTokenIssuer,
  authTokenAlgorithm,
  tokenExpiresIn,
} = require("../config");

// Passport Strategy for signing up new users
passport.use(
  "signup",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await userService.create({ email, password });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Passport Strategy for login
passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const authenticatedUser = await userService.authenticate(
          email,
          password
        );

        if (!authenticatedUser) {
          return done(null, false);
        }

        return done(null, authenticatedUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Passport Strategy for JWT
passport.use(
  "jwt",
  new JWTstrategy(
    {
      secretOrKey: JwtTokenSecret,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      issuer: authTokenIssuer,
      // audience: "sweepstakes.com", // TODO: OVERWRITE!/ADD BACK WITH PROPER VALUE
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = {
  signup(req, res, next) {
    passport.authenticate("signup", (err, user, info) => {
      Logger.debug("validationResult(req) = ", validationResult(req));
      if (err) {
        return next(err);
      }

      if (!user) {
        if (info) {
          Logger.debug(`${JSON.stringify(info)}`);
        }
        return next(Boom.badRequest(info.message));
      }

      req.login(user, { session: false }, err => {
        if (err) return next(err);

        const body = {
          iss: authTokenIssuer,
          sub: user.email,
          user: { id: user.id, email: user.email },
        };
        const token = jwt.sign(body, JwtTokenSecret, {
          algorithm: authTokenAlgorithm,
          expiresIn: tokenExpiresIn,
        });

        return res.json({ token, user: req.user });
      });
    })(req, res, next);
  },

  login(req, res, next) {
    passport.authenticate("login", (err, user, info) => {
      try {
        if (err) {
          return next(err);
        }
        if (!user) {
          if (info) {
            Logger.debug(
              `User was not found or password was incorrect , ${JSON.stringify(
                info
              )}`
            );
          }
          return next(Boom.unauthorized("Incorrect credentials"));
        }

        req.login(user, { session: false }, err => {
          if (err) return next(err);

          const body = {
            iss: authTokenIssuer,
            sub: user.email,
            user: { id: user.id, email: user.email },
          };
          const token = jwt.sign(body, JwtTokenSecret, {
            algorithm: authTokenAlgorithm,
            expiresIn: tokenExpiresIn,
          });

          return res.json({ token, user: req.user });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  },

  jwt(req, res, next) {
    passport.authenticate("jwt", { session: false })(req, res, next);
  },
};
