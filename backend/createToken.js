const jwt = require('jsonwebtoken');
const TOKEN_SECRET_KEY = require('./utils');
const { model } = require('./models/users');
getToken = (user)=>{
    return jwt.sign({
      username : user.username,
      email : user.email
    }, TOKEN_SECRET_KEY );
}
module.exports = getToken ;