const cardRepo = require('../../repositories/cards/card.repository');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const getAllCards = async (userId) => {
    const result = await cardRepo.getAllCards(userId);

    return Promise.resolve(result);
};
const getAllCardSet = async (data) => {
    const result = await cardRepo.getAllCardSet(data._id, data.cardName);

    // console.log(result);

    return Promise.resolve(result);
};

const newDeck = async (data) => {

    const schema = Joi.object({
        _id: Joi.string().required(),
        cardName: Joi.string().min(3).max(20).required().error(new Error('Cannot be empty. At least 3 caracters are required.'))
    });

    return Joi.validate(data, schema, async (err, value) => {
        if (err) {
            return Promise.reject(err.message);
        }
        const result = await cardRepo.newDeck(value._id, value.cardName);
        return Promise.resolve(result);
    });

};
const delDeck = async (data) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        cardName: Joi.string().min(3).max(20).required()
    });
    return Joi.validate(data, schema, async (err, value) => {
        if (err) {
            return Promise.reject(err.message);
        }
        const result = await cardRepo.delDeck(data._id, data.cardName);
        return Promise.resolve(result);
    });

};
const renameDeck = async (data) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        oldCardName: Joi.string().min(3).max(20).required(),
        newCardName: Joi.string().min(3).max(20).required()
    });
    return Joi.validate(data, schema, async (err, value) => {
        if (err) {
            return Promise.reject(err.message);
        }
        const result = await cardRepo.renameDeck(value._id, value.oldCardName, value.newCardName);
        return Promise.resolve(result);
    });

};


module.exports = {
    getAllCards,
    newDeck,
    delDeck,
    renameDeck,
    getAllCardSet
};