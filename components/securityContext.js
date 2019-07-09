const jwt = require('jsonwebtoken');
const fs = require('fs');

const _token = null;

// VERIFY TOKEN
const discoverToken = async (token) => {
    
    if (!token) {

        return;
    }
    const privateKey = fs.readFileSync('config/private.key');

    this._token = jwt.verify(token, privateKey);

};

// THIS WILL RETURN CURRENT USER BASED ON THE ACTIVE TOKEN
const getCurrentUser = async () => {
    if (!this._token) {
        return null;
    }
    return this._token.id;
};


module.exports = {
    discoverToken,
    getCurrentUser
};