const jwt = require('jsonwebtoken');
const TOKEN_SECRET_KEY = require('./utils');
const { model } = require('./models/users');
getToken = (user)=>{
    return jwt.sign({
      user
    }, TOKEN_SECRET_KEY , {
        expiresIn : "60000"
    });
}
module.exports = getToken ;