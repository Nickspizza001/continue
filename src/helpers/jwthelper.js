const jwt = require("jsonwebtoken");
const Response = require("../utils/response");
const Settings = require("./settings");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        id: userId,
      };
      const secret = Settings.getSecretKey();
      const options = {
        expiresIn: "30s",
        issuer: "topuniverse1.com",
        audience: userId,
      };

      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(Response.error(500, "Internal server", err));
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    //if(!req.Headers['authorization']) res.send(Response.error(500, "UnAuthorized"))
    const authHeader = req.headers["authorization"];

    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    jwt.verify(token, Settings.getSecretKey(), (err, payload) => {
      if (err) {
        let response = Response.error(
          500,
          "Unauthorized/Wrong Access Token",
          err.message
        );
        res.status(response.code).send(response);
        return;
        //console.log({err})
      }
      req.payload = payload;
      next();
    });
  },
};
