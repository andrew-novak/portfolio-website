const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const Admin = require("../models/Admin");

const JWT_SECRET = process.env.ANOVAK_SITE_ADMIN_JWT_SECRET;

// done() signature: done( error, user, info )

module.exports = (passport) => {
  passport.serializeUser((admin, done) => {
    const tokenKey = admin._id;
    return done(null, tokenKey);
  });

  passport.deserializeUser((tokenKey, done) => {
    Admin.findById(tokenKey, (err, admin) => {
      return done(err, admin);
    });
  });

  passport.use(
    new LocalStrategy(
      // Options:
      {
        usernameField: "email",
        passwordField: "password",
      },
      // Verify Callback:
      (email, password, done) => {
        Admin.findOne({ email }).exec((err, admin) => {
          if (!admin)
            return done(null, false, {
              messagge: "This email is not assigned to any account.",
            });
          bcrypt.compare(password, admin.passwordHash, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) return done(null, admin);
            else return done(null, false, { message: "Incorrect password." });
          });
        });
      }
    )
  );

  passport.use(
    new JwtStrategy(
      // Options:
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // NOTE: Generate a new secret for every project online.
        secretOrKey: JWT_SECRET,
      },
      // Verify Callback:
      (payload, done) => {
        Admin.findById({ _id: payload.adminId }).exec((err, admin) => {
          if (err) return done(err, false);
          if (!admin) return done(null, false);
          return done(null, admin);
        });
      }
    )
  );
};
