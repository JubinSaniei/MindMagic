const jwt = require('jsonwebtoken');
const config = require('config');

const _token = null;
const discoverToken = async (token) => {
    if (!token) {

        return;
    }
    this._token = jwt.verify(token, config.get('jwtPrivateKey11'));
};

const getCurrentUser = async () => {
    if (!this._token) {
        return null;
    }
    return this._token.id;
};

// jwt.sign({
//     id: getCurrentUser._id
// }, 'jubin')
//Check the Enviroemtn Key for Token Authentication
// if (!config.get('jwtPrivatKey')) {
//     console.log('FATAL ERROR: jwtPrivatKey is not defined.');
//     process.exit(1);
// }

module.exports = {
    discoverToken,
    getCurrentUser
}