var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
let jwt = require("jsonwebtoken");
let config = require("./config");
const bcrypt = require("bcrypt");
const { userService } = require("../../services/userService");

passport.use(
  new LocalStrategy((username, password, done) => {
    userService.loginUser(username, (err, res) => {
      if (err) {
        return done(err);
      }
      if (!res) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!bcrypt.compareSync(password, res.hash)) {
        return done(null, false, { message: "Incorrect password." });
      }
      //BUILD OUR TOKEN
      let newToken = jwt.sign(
        {
          username: res.email,
          role: res.role,
        },
        config.secret,
        {
          expiresIn: "1h",
        }
      ); // expires in 1 hour '1h' , 5 - 5 seconds
      return done(null, { user: res, token: newToken });
    });
  })
);

module.exports = passport;
