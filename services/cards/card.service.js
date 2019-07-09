const cardRepo = require('../../repositories/cards/card.repository');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const getAllCards = async (data) => {
    const result = await cardRepo.getAllCards(data);
    return Promise.resolve(result);
};

const newCard = async (data) => {

    const schema = Joi.object({
        _id: Joi.string().required(),
        cardName: Joi.string().min(3).max(20).required()
    });

    return Joi.validate(data, schema, async (err, value) => {
        if (err) {
            return Promise.reject(err.message);
        }
        const result = await cardRepo.newCard(value._id, value.cardName);
        return Promise.resolve(result);
    });

};
const delCard = async (data) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        cardName: Joi.string().min(3).max(20).required()
    });
    return Joi.validate(data, schema, async (err, value) => {
        if (err) {
            return Promise.reject(err.message);
        }
        const result = await cardRepo.delCard(data._id, data.cardName);
        return Promise.resolve(result);
    });

};
const renameCard = async (data) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        oldCardName: Joi.string().min(3).max(20).required(),
        newCardName: Joi.string().min(3).max(20).required()
    });
    return Joi.validate(data, schema, async (err, value) => {
        if (err) {
            return Promise.reject(err.message);
        }
        const result = await cardRepo.renameCard(value._id, value.oldCardName, value.newCardName);
        return Promise.resolve(result);
    });

};


module.exports = {
    getAllCards,
    newCard,
    delCard,
    renameCard
};