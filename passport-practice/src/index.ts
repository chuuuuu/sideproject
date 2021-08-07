import express, { RequestHandler } from "express";
import passport from "passport";
import passportLocal from "passport-local";
import session from "express-session";
import flash from "express-flash";

/**************
* User related
**************/
type User = {
  id: string;
  username: string;
  password: string;
};

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
      password: string;
    }
  }
}

const users: User[] = [{ id: "0", username: "chu", password: "chu" }];

const getUserByUsername = (username: string): User | undefined => {
  const user = users.find((user) => user.username === username);
  return user;
};

const getUserById = (id: string): User | undefined => {
  const user = users.find((user) => user.id === id);
  return user;
};

/****************************
* authentication middleware
****************************/
const checkAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.sendStatus(401);
};

const checkNotAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

/******
* main
******/
const main = async () => {
  const app = express();

  app.set("view-engine", "ejs");
  app.use(express.urlencoded({ extended: false }));
  app.use(flash());

  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    })
  );

  passport.use(
    new passportLocal.Strategy({}, async (username, password, done) => {
      const user = getUserByUsername(username);
      if (!user) {
        done(null, false, { message: "No user with that username" });
        return;
      }

      if (user.password !== password) {
        done(null, false, { message: "Password Incorrect" });
        return;
      }

      done(null, user);
    })
  );

  passport.serializeUser<string>((user: User, done) => {
    console.log("serializeUser", user.id);
    done(null, user.id);
  });

  passport.deserializeUser<string>((id: string, done) => {
    const user = getUserById(id);
    console.log("deserializeUser", user);
    done(null, user);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/", checkAuthenticated, (req, res) => {
    res.render("index.ejs", { username: req.user?.username });
  });

  app.get("/login", checkNotAuthenticated, (_req, res) => {
    res.render("login.ejs");
  });

  app.post(
    "/login",
    checkNotAuthenticated,
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

  app.get("/register", checkNotAuthenticated, (_req, res) => {
    res.render("register.ejs");
  });

  app.post("/register", checkNotAuthenticated, (req, res) => {
    users.push({
      id: Date.now().toString(),
      ...req.body,
    });
    res.redirect("/login");
  });

  app.post("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((e) => console.log(e));
