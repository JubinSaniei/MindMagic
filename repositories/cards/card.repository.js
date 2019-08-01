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
        const allCards = [];


        const request = client.db("MindMagic").collection("Users");
        // SHOW ALL CARDS BELONG TO THE USER
        const result = await request.findOne({
            _id: ObjectId(UserId)
        }, {

            projection: {
                _id: 1,
                deck: 1
            }
        });

        for (let index = 0; index < result.deck.length; index++) {
            const element = result.deck[index];

            const obj = {
                cardName: element.cardName,
                allStagesCount: element.cardSet.length,
                stage1Count: 0,
                stage2Count: 0,
                stage3Count: 0,
                stage4Count: 0,
                stage5Count: 0,
                stage6Count: 0,
                stage7Count: 0,
                stageCompletedCount: 0,
                stage1: [],
                stage2: [],
                stage3: [],
                stage4: [],
                stage5: [],
                stage6: [],
                stage7: [],
                stageCompleted: []
            };

            // LOAD STAGE 1
            obj.stage1 = element.cardSet.filter(function (i) {
                return i.stage === 1;
            });
            obj.stage1Count = obj.stage1.length;

            // LOAD STAGE 2
            obj.stage2 = element.cardSet.filter(function (i) {
                return i.stage === 2;
            });
            obj.stage2Count = obj.stage2.length;
            // LOAD STAGE 3
            obj.stage3 = element.cardSet.filter(function (i) {
                return i.stage === 3;
            });
            obj.stage3Count = obj.stage3.length;
            // LOAD STAGE 4
            obj.stage4 = element.cardSet.filter(function (i) {
                return i.stage === 4;
            });
            obj.stage4Count = obj.stage4.length;
            // LOAD STAGE 5
            obj.stage5 = element.cardSet.filter(function (i) {
                return i.stage === 5;
            });
            obj.stage5Count = obj.stage5.length;
            // LOAD STAGE 6
            obj.stage6 = element.cardSet.filter(function (i) {
                return i.stage === 6;
            });
            obj.stage6Count = obj.stage6.length;
            // LOAD STAGE 7
            obj.stage7 = element.cardSet.filter(function (i) {
                return i.stage === 7;
            });
            obj.stage7Count = obj.stage7.length;
            // LOAD STAGE COMPLETED
            obj.stageCompleted = element.cardSet.filter(function (i) {
                return i.stage === 8;
            });
            obj.stageCompletedCount = obj.stageCompleted.length;

            allCards.push(obj);
        }

        return Promise.resolve(allCards);


    } catch (error) {
        return Promise.reject(error);
    } finally {
        client.close();
    }
};

const getAllCardSet = async (userId, cardName) => {
    const client = new MongoClient(dbConfig, {
        useNewUrlParser: true
    });
    client.on('err', err => {
        return Promise.reject(err);
    });

    try {
        await client.connect();

        const request = client.db("MindMagic").collection("Users");

        const result = await request.findOne({
            'deck.cardName': cardName,
            _id: ObjectId(userId)
        }, {
            projection: {
                deck: 1
            }

        });

        return Promise.resolve(result);

    } catch (error) {
        return Promise.reject(error);
    } finally {
        client.close();
    }
};

const newDeck = async (userId, cardName) => {

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
        for (let index = 0; index < isCardExist.deck.length; index++) {
            const element = isCardExist.deck[index];
            if (cardName === element.cardName) {
                return Promise.reject(`${cardName} is already exist.`);
            }
        }

        // ADD NEW RECORD TO THE DATABASE
        const result = await request.updateOne({
            _id: ObjectId(userId)
        }, {
            $push: {
                deck: {
                    cardName: cardName,
                    cardSet: [],
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

const delDeck = async (userId, cardName) => {
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
                deck: {
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

const renameDeck = async (userId, oldCardName, newCardName) => {
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
                'deck.$[elem].cardName': newCardName
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
    newDeck,
    delDeck,
    renameDeck,
    getAllCardSet
};