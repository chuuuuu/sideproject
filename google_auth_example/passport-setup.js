const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
  done(null, user);
});

/* .env example
clientID = xxxxx
clientSecret = xxxxx
*/

const dotenv = require("dotenv");
dotenv.config("./.env");

console.log(`your client id: ${process.env.clientID}`);
console.log(`your client secret: ${process.env.clientSecret}`);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "694094429187-9jo4vcpjc0ndu65abfo88j4fbfc1c09l.apps.googleusercontent.com",
      clientSecret: "Xp_vJFM7eJv6UpTwxyWNmrVl",
      callbackURL: "http://localhost:3000/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      /*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
      return done(null, profile);
    }
  )
);
