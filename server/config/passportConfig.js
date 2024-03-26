require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("get to this state");

      let user = await User.findOne(
        {
          googleId: profile.id,
        },
        {
          name: 1,
          email: 1,
          googleId: 1,
          verified: 1,
        }
      );

      if (user) return cb(null, user);

      let otherUser = await User.findOne(
        {
          email: profile.email,
        },
        {
          googleId: 1,
        }
      );

      if (otherUser && !otherUser.googleId) {
        return cb(null, false, {
          message: "This account is not linked to a Google account",
        });
      }

      let newUser = new User({
        name: profile.name,
        email: profile.email,
        googleId: profile.id,
        verified: true,
      });

      await newUser.save();

      return cb(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  // const user = await User.find(
  //   { _id: id },
  //   {
  //     email: 1,
  //     verify: 1,
  //     name: 1,
  //   }
  // );
  done(null, id);
});
