const express = require("express");
const {
  setupKinde,
  protectRoute,
  getUser,
} = require("@kinde-oss/kinde-node-express");

const app = express();

// const config = {
//   clientId: process.env.KINDE_DOMAIN,
//   issuerBaseUrl: process.env.KINDE_CLIENT_ID,
//   siteUrl: process.env.KINDE_CLIENT_SECRET,
//   secret: process.env.KINDE_REDIRECT_URI,
//   redirectUrl: process.env.KINDE_LOGOUT_REDIRECT_URI,
// };
const config = {
  clientId: process.env.KINDE_CLIENT_ID,
  issuerBaseUrl: process.env.KINDE_DOMAIN,
  siteUrl: "http://localhost:3000",
  secret: process.env.KINDE_CLIENT_SECRET,
  redirectUrl: process.env.KINDE_LOGOUT_REDIRECT_URI,
};

setupKinde(config, app);

app.get("/", (req, res) => {
  if (req.session && req.session.kindeAccessToken) {
      res.send("You are authenticated!");
  } else {
      res.send("You are not");
  }
});

app.listen(3000, () => console.log("running on port 3000"))