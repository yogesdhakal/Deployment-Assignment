const basicAuth = require('basic-auth');
const admin = require("../models/admin");

async function basicAuthMiddleware(req, res, next) {
    const user = basicAuth(req);
    if(!user){
      res.setHeader('WWW-Authenticate', 'Basic realm="Example"');
      return res.status(401).json({
        message: "Authentication required"
      });
    }
    const adminData = await admin.findOne();
  
    if (adminData && user.name === adminData.username && user.pass === adminData.password) {
      return next();
    } else {
      res.setHeader('WWW-Authenticate', 'Basic realm="Example"');
      return res.status(401).json({
        message: 'Invalid credentials provided'
      });
    }
}

module.exports = {
    basicAuthMiddleware
}