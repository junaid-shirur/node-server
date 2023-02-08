const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

// accessTokens
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
}

let refreshTokens = []
function generateRefreshToken(user) {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "20m" })
    refreshTokens.push(refreshToken)
    return refreshToken
}

function validateToken(req, res, next) {//get token from request header
    const token = req.headers['accesstoken']
    if (!token) res.sendStatus(400).send("Token not present")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403).send("Token invalid")
        }
        else {
            req.user = user
            next() //proceed to the next action in the calling function
        }
    })
}


// function getCookie(name) {
//     var value = "; " + document.cookie;
//     var parts = value.split("; " + name + "=");
//     if (parts.length == 2) return parts.pop().split(";").shift();
//   }
  
//   const accessToken = getCookie("accessToken");
//   const refreshToken = getCookie("refreshToken");

  
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    validateToken
}