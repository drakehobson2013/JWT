const jwt = require('jsonwebtoken');

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

module.exports = { requireAuth };