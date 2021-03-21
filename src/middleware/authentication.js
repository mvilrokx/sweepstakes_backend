const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const userService = require("../services/userService");
const Logger = require("../lib/logger.js");
const { JwtTokenSecret, authTokenIssuer } = require("../config");

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
        done(error);
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
        done(error);
      }
    }
  )
);

module.exports = {
  signup(req, res, next) {
    passport.authenticate("signup", (err, user, info) => {
      if (err) {
        return next(err);
      }
      // CUSTOM LOGIC (IF NEEDED)
      // if (!user) {
      //   if (info) {
      //     logger.debug(`User was not found, ${JSON.stringify(info)}`);
      //   }
      //   return res.status(401).json({ errors: [InvalidCredentialsError] });
      // }
      // if (!user.confirmed) {
      //   return res.status(401).json({ errors: [UnConfirmedSignInError] });
      // }

      req.logIn(user, { session: false }, err => {
        if (err) {
          return next(err);
        }
        next();
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
            Logger.debug(`User was not found, ${JSON.stringify(info)}`);
          }
          return next(new Error("401"));
        }

        req.login(user, { session: false }, async error => {
          if (error) return next(error);

          const body = {
            iss: authTokenIssuer,
            sub: user.email,
            user: { id: user.id, email: user.email },
          };
          const token = jwt.sign(body, JwtTokenSecret);

          return res.json({ token });
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
