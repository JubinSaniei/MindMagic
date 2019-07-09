const dbConfig = require('../../config/dbconfig').dbConfig.url;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const getAllCards = async (UserId) => {
    const client = new MongoClient(dbConfig, {
        useNewUrlParser: true
    });
    client.on('err', err => {
        return Promise.reject(err);
    });
    try {
        await client.connect();
        const request = client.db("MindMagic").collection("Users");
        // SHOW ALL CARDS BELONG TO THE USER
        const result = await request.findOne({
            _id: ObjectId(UserId)
        }, {
            
            projection: {
                _id: 1,
                cards: 1
            }
        });

        return Promise.resolve(result);


    } catch (error) {
        return Promise.reject(error);
    } finally {
        client.close();
    }
};

const newCard = async (userId, cardName) => {
    const client = new MongoClient(dbConfig, {
        useNewUrlParser: true
    });
    client.on('err', err => {
        return Promise.reject(err);
    });
    try {
        await client.connect();
        const request = client.db("MindMagic").collection("Users");

        // LOOK FOR USER ID
        const isCardExist = await request.findOne({
            _id: ObjectId(userId)
        });

        // CHECK IF CARD ALREADY EXISTS
        for (let index = 0; index < isCardExist.cards.length; index++) {
            const element = isCardExist.cards[index];
            if (cardName === element.cardName) {
                return Promise.reject(`${cardName} is already exist.`);
            }
        }
        // ADD NEW RECORD TO THE DATABASE
        const result = await request.updateOne({
            _id: ObjectId(userId)
        }, {
            $push: {
                cards: {
                    cardName: cardName,
                    stage1: [],
                    stage2: [],
                    stage3: [],
                    stage4: [],
                    stage5: [],
                    stage6: [],
                    stage7: [],
                    completed: [],
                    lastExamDate: null,
                    createdDate: new Date()
                }
            }
        }, {
            upsert: true
        });
        return Promise.resolve(`${cardName} is created`);

    } catch (error) {
        return Promise.reject(error);
    } finally {
        client.close();
    }
};

const delCard = async (userId, cardName) => {
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
            _id: ObjectId(userId)
        }, {
            $pull: {
                cards: {
                    cardName: cardName
                }
            }
        });

        return Promise.resolve(`${cardName} is deleted`);

    } catch (error) {
        return Promise.reject(error);
    } finally {
        client.close();
    }
};

const renameCard = async (userId, oldCardName, newCardName) => {
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
            _id: ObjectId(userId)
        }, {
            $set: {
                'cards.$[elem].cardName': newCardName
            }
        }, {
            arrayFilters: [{
                'elem.cardName': oldCardName
            }]
        });
        return Promise.resolve(`${oldCardName} updated with ${newCardName}.`);

    } catch (error) {
        return Promise.reject(error);
    } finally {
        client.close();
    }
};

module.exports = {
    getAllCards,
    newCard,
    delCard,
    renameCard
};