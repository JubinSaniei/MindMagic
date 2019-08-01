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
                    ['deck.$[element].cardSet']: {
                        card_id: uuid(),
                        frontSide: frontSide,
                        backSide: backSide,
                        stage: stage,
                        createdDate: new Date().toLocaleDateString()
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
const deleteStCard = async (UserId, cardName, card_id) => {
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
                ['deck.$[element].cardSet']: {
                    card_id: card_id
                }
            }
        }, {
            arrayFilters: [{
                'element.cardName': cardName
            }],
            projection: {
                deck: 1
            }
        });
        if (result.modifiedCount === 0) {
            return Promise.reject(`Error: Card is not found.`);
        }
        return Promise.resolve(`Card is successfully deleted.`);

    } catch (error) {
        return Promise.reject(error);
    } finally {
        client.close();
    }
};

const updateStCard = async (UserId, cardName, card_id, frontSide, backSide, stage) => {
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
        }, {
            $set: {
                ['deck.$[elem].cardSet.$[elem2]']: {
                    card_id: card_id,
                    frontSide: frontSide,
                    backSide: backSide,
                    stage: stage
                }
            }
        }, {
            arrayFilters: [{
                    'elem.cardName': cardName,
                },
                {
                    'elem2.card_id': card_id
                }
            ]
        });

        if (result.modifiedCount === 0) {

            return Promise.resolve('nothing changed');
        }
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