const { UnAuthorized, UnAuthenticated } = require("../utils/error-app");
const { ValidateAccessTokenKey } = require("../utils");

const verifyToken = (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) throw new UnAuthenticated("Un Authenticated")
    try {
      const payload = ValidateAccessTokenKey(token);
      req.user = payload;
    } catch (err) {
      throw res.status(401).send("Invalid Token");
    }
    return next();
};

const isAdmin = (req, res, next) => {
  const {role} = req.user

  if(!role) throw new UnAuthenticated("Un Authenticated")

  if(role.toLowerCase() !== 'admin') throw new UnAuthorized('Un Authorized') 

  return next()
}

module.exports = {verifyToken, isAdmin};