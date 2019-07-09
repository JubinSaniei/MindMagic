const dbConfig = require('../../config/dbconfig').dbConfig.url;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const uuid = require('uuid');

const addToStage = async (UserId, cardName, frontSide, backSide, stage) => {
    
    const client = new MongoClient(dbConfig, {
        useNewUrlParser: true
    });
    client.on('err', err => {
        return Promise.reject(err);
    });
    try {
        await client.connect();
        const request = client.db("MindMagic").collection("Users");

        const result = await request.updateOne({
                _id: ObjectId(UserId)
            },

            {
                $push: {
                    ['cards.$[element].' + stage]: {
                        card_id: uuid(),
                        frontSide: frontSide,
                        backSide: backSide
                    }
                },
            }, {
                arrayFilters: [{
                    'element.cardName': cardName
                }]
            }
        );
        return Promise.resolve(result);

    } catch (error) {
        return Promise.reject(error);
    } finally {
        client.close();
    }
};
const deleteStCard = async (UserId, cardName, frontSide, backSide, stage, card_id) => {
    const client = new MongoClient(dbConfig, {
        useNewUrlParser: true
    });
    client.on('err', err => {
        return Promise.reject(err);
    });
    try {
        await client.connect();
        const request = client.db("MindMagic").collection("Users");

        const result = await request.updateOne({
            _id: ObjectId(UserId),
           
        }, {
            $pull: {
                ['cards.$[element].' + stage]: {
                    card_id: card_id,
                    frontSide: frontSide,
                    backSide: backSide
                }
            }
        }, {
            arrayFilters: [{
                'element.cardName': cardName
            }],
            projection: {
                cards: 1
            }
        });
        if (result.modifiedCount===0) {
            return Promise.reject(`Error: ${frontSide} is not found.`);
        }
        return Promise.resolve(`${frontSide} successfully deleted.`);

    } catch (error) {
        return Promise.reject(error);
    } finally {
        client.close();
    }
};

const updateStCard = async (UserId, cardName, card_id, stage, frontSide, backSide) => {
    const client = new MongoClient(dbConfig, {
        useNewUrlParser: true
    });
    client.on('err', err => {
        return Promise.reject(err);
    });
    try {
        await client.connect();
        const request = client.db("MindMagic").collection("Users");

        const result = await request.findOneAndUpdate({
            _id: ObjectId(UserId)
        }, {
            $set: {
                ['cards.$[elem].' + stage + '.$[elem2]']: {
                    card_id: card_id,
                    frontSide: frontSide,
                    backSide: backSide
                }
            }
        }, {
            arrayFilters: [{
                    'elem.cardName': cardName,
                },
                {
                    'elem2.card_id': card_id
                }
            ],
        });

        return Promise.resolve('updated');

    } catch (error) {
        return Promise.reject(error);

    } finally {
        client.close();
    }

};


module.exports = {
    addToStage,
    updateStCard,
    deleteStCard,

};