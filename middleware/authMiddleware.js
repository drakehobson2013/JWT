const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists and is valid
    if (token) {
        jwt.verify(token, 'long ass secret', (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
                
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}

// check current user
const checkUser = (req,res, next) => {
    const token = req.cookies,jwt;

    if (token){
        jwt.verify(token, 'long ass secret', async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                next();
            }
            else{
                console.log(decodedToken);
                let user = await User.findByID(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })  
    }
    else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };