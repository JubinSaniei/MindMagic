const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(roles) {

    return function (req, res, next) {

        const token = req.header('x-auth-token');

        if (!token) return res.status(401).send('Access denied. No token provided');

        try {
            const decoded = jwt.sign({
                id: _id.User
            }, 'jubin');

            req.user = decoded;
            let iUSerInRole = false;
            if (roles) {
                roles.forEach((val) => {
                    if (decoded.roles) {
                        decoded.roles.forEach((tokenRoles) => {
                            if (val == tokenRoles.RoleName) {
                                iUSerInRole = true;
                            }
                        });
                    }
                });
            } else {
                if (decoded.roles) {
                    decoded.roles.forEach((tokenRoles) => {
                        if ('user' == tokenRoles.RoleName) {
                            iUSerInRole = true;
                        }
                    });
                }
            }

            if (iUSerInRole == false) {
                res.status(400).send('Permission not granted.');
            }
        } catch (ex) {
            res.status(400).send('Invalid token.');
        }
        next();
    };

};