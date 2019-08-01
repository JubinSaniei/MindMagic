const stageRepo = require('../../repositories/cards/stage.repository');
const cardsRepo = require('../../repositories/cards/card.repository');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const addToStage = async (data) => {

    try {
        const schema = Joi.object({
            _id: Joi.string().required(),
            cardName: Joi.string().required(),
            frontSide: Joi.string().required(),
            backSide: Joi.string().required()
        });
        return Joi.validate(data, schema, async function (err, value) {
            if (err) {
                return Promise.reject(err.message);
            }
            let stage = 1;
            const result = await stageRepo.addToStage(value._id, value.cardName, value.frontSide, value.backSide, stage);

            if (result.modifiedCount === 0) {
                return Promise.resolve(`Error: ${value.frontSide}, ${value.backSide} not created.`);
            }
            return Promise.resolve(`${value.frontSide}, ${value.backSide} created.`);
        });
    } catch (error) {
        return Promise.reject(error);
    }
};
const updateStCard = async (data) => {

    try {
        const schema = Joi.object({
            _id: Joi.string().required(),
            cardName: Joi.string().required(),
            card_id: Joi.string().required(),
            frontSide: Joi.string().required(),
            backSide: Joi.string().required(),
            stage: Joi.number().required(),
            result: Joi.bool().required()
        });

        return Joi.validate(data, schema, async (err, value) => {
            let newStage = null;
            if (err) {
                return Promise.reject(err.message);
            }
            if (value.result === true) {
                newStage = value.stage + 1;
                if (newStage === 8) {
                    
                    newStage = 8;
                }
            } else if (value.result === false) {
                newStage = 1;
            }

            const result = await stageRepo.updateStCard(value._id, value.cardName, value.card_id, value.frontSide, value.backSide, newStage);
            return Promise.resolve(result);
        });
    } catch (error) {
        return Promise.reject(error);
    }

};
const deleteStCard = async (data) => {
    try {
        const schema = Joi.object({
            _id: Joi.string().required(),
            cardName: Joi.string().required(),
            card_id: Joi.string().required(),
        });

        return Joi.validate(data, schema, async (err, value) => {
            if (err) {
                return Promise.reject(err);
            }
            const result = await stageRepo.deleteStCard(value._id, value.cardName, value.card_id);
            return Promise.resolve(result);
        });

    } catch (error) {
        return Promise.reject(error);
    }
};

// const answer = async (data) => {
//     console.log('answer', data);
//     try {

//         let newStage = 'stage' + (parseInt((data.stage).match(/\d+/)[0], 10) + 1);
//         if (newStage === 'stage8') {
//             newStage = 'completed';
//         }

//         if (data.result === true) {
//             const delOldLocation = await stageRepo.deleteStCard(data._id, data.cardName, data.frontSide, data.backSide, data.stage, data.card_id);

//             if (delOldLocation.modifiedCount === 0) {
//                 return Promise.reject(`${data.frontSide} already moved to ${newStage}.`);
//             } else {
//                 const addToUpperStage = await stageRepo.addToStage(data._id, data.cardName, data.frontSide, data.backSide, newStage);

//             }

//         } else if (data.result === false) {
//             const stage1 = 'stage1';

//             const delOldLocation = await stageRepo.deleteStCard(data._id, data.cardName, data.frontSide, data.backSide, data.stage, data.card_id);
//             if (delOldLocation.modifiedCount === 0) {
//                 return Promise.reject(`${data.frontSide} already moved to ${stage1}.`);
//             } else {

//                 const addToUpperStage = await stageRepo.addToStage(data._id, data.cardName, data.frontSide, data.backSide, stage1);

//             }

//         } else {
//             return Promise.reject('Error');
//         }




//     } catch (error) {
//         return Promise.reject(error);
//     }

// };

module.exports = {
    addToStage,
    updateStCard,
    deleteStCard,
    // answer,

};