const userRepo = require('../../repositories/users/user.repository');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const svgCaptcha = require('svg-captcha');
// const Recaptcha = require('express-recaptcha').RecaptchaV3;
// const recaptcha = new Recaptcha('SITE_KEY', 'SECRET_KEY');


// const captcha = async () => {
//     const x = (recaptcha.middleware.render, function (req, res) {
//         console.log(res);
//     });

// };


const getAll = async () => {
    const result = await userRepo.getAll();
    return Promise.resolve(result);
};

const register = async (data) => {
    const schema = Joi.object({
        userName: Joi.string().email().required().label('Username must be an email address.'),
        password: Joi.string().min(6).max(16).required().label('Password must at least 6 caracters'),
        confirmPassword: Joi.string().min(6).max(16).required().label('Password must at least 6 caracters'),
        captcha: Joi.string().required()

    }).with('userName', 'password');

    return Joi.validate(data, schema, async (err, value) => {
        if (err) {
            console.log(err.details[0].context.label);
            return Promise.reject(err);
        }
        if (value.password !== value.confirmPassword) {
            return Promise.reject('Passwords not match');
        }
        // CHECK FOR DOUPLICATE VALUE BEFORE SAVE
        const userCheck = await userRepo.findUserName(value.userName);
        if (userCheck !== null) {
            return Promise.reject('Username is already exist in the database.');

        } else {
            console.log('error');
            // ENCRYPTING PASSWORD
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(value.password, saltRounds);

            // SEND SAVE RESUEST TO REPOSITORY
            const result = await userRepo.register(value.userName, hashedPassword);
            return Promise.resolve(result);
        }
    });
};

const login = async (data) => {
    const schema = Joi.object({
        userName: Joi.string().email().required().label('Username must be an email address.'),
        password: Joi.string().min(6).max(16).required().label('Password must at least 6 caracters')
    }).with('userName', 'password');

    return Joi.validate(data, schema, async (err, value) => {

        if (err) {
            return Promise.reject(err.message);
        }

        const userCheck = await userRepo.findUserName(value.userName);
        if (userCheck === null) {
            return Promise.reject('Invalid Username or Password.');
        }
        const passCompare = await bcrypt.compare(value.password, userCheck.password);

        if (passCompare === false) {
            return Promise.reject('Invalid Username or Password.');
        } else {
            return Promise.resolve('login successfull');
        }

    });
};

const resetPassword = async (data) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        oldPassword: Joi.string().min(6).max(16).required().label('Password must at least 6 caracters.'),
        newPassword: Joi.string().min(6).max(16).required().label('Password must at least 6 caracters.'),
        confirmPassword: Joi.string().min(6).max(16).required().label('Password must at least 6 caracters')
    });

    return Joi.validate(data, schema, async (err, value) => {
        if (err) {
            return Promise.reject(err.message);
        }

        if (value.newPassword !== value.confirmPassword) {
            return Promise.reject('Password is not match.');
        }
        const userCheck = await userRepo.findById(value._id);
        if (userCheck === null) {
            return Promise.reject('Service: Invalid request. Not exists');
        }
        const passCompare = await bcrypt.compare(value.oldPassword, userCheck.password);

        if (passCompare === false) {
            return Promise.reject('Your current password is not correct.');
        } else {

            // ENCRYPTING PASSWORD
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(value.newPassword, saltRounds);
            const result = await userRepo.resetPassword(value._id, hashedPassword);

            return Promise.resolve(result);
        }
    });
};

const updateProfile = async (data) => {

    const schema = Joi.object({
        _id: Joi.string(),
        userName: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().optional()
    });
    return Joi.validate(data, schema, async (err, value) => {
        if (err) {
            return Promise.reject(err.message);
        }
        const result = await userRepo.updateProfile(value._id, value.userName, value.firstName, value.lastName);

        return Promise.resolve(result);
    });


};

module.exports = {
    getAll,
    register,
    updateProfile,
    login,
    resetPassword,
    // captcha
};