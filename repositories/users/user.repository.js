const dbConfig = require('../../config/dbconfig').dbConfig.url;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;


const getAll = async () => {
    const client = new MongoClient(dbConfig, {
        useNewUrlParser: true
    });
    client.on('err', err => {
        return Promise.reject(err);
    });
    try {
        await client.connect();
        const request = client.db("MindMagic").collection("Users");
        const result = await request.find({}, {
            projection: {
                _id: 1,
                userName: 1
            }
        }).toArray();
        return Promise.resolve(result);

    } catch (error) {

        return Promise.reject(`DB Error: ${error.errorLabels}`);
    } finally {
        client.close();
    }
};

const findUserName = async (userName) => {

    const client = new MongoClient(dbConfig, {
        useNewUrlParser: true
    });
    client.on('err', err => {
        return Promise.reject(err);
    });
    try {
        await client.connect();
        const request = client.db("MindMagic").collection("Users");

        const find = await request.findOne({
            userName: userName
        });

        return Promise.resolve(find);


    } catch (error) {

        return Promise.reject(`DB Error: ${error.errorLabels}`);
    } finally {
        client.close();
    }
};

const register = async (userName, password) => {
    const client = new MongoClient(dbConfig, {
        useNewUrlParser: true
    });
    client.on('err', err => {
        return Promise.reject(err);
    });
    try {
        await client.connect();
        const request = client.db('MindMagic').collection('Users');
        const schema = {
            userName: userName,
            password: password,
            firstName: null,
            lastName: null,
            cards: []
        };
        const result = await request.insertOne(schema);
        return Promise.resolve(`${userName} is created`);

    } catch (error) {
        return Promise.reject(`DB Error: ${error}`);
    } finally {
        client.close();
    }
};

const updateProfile = async (userId, userName, firstName, lastName) => {
    const client = new MongoClient(dbConfig, {
        useNewUrlParser: true
    });
    client.on('err', err => {
        return Promise.reject(err);
    });
    try {
        await client.connect();
        const request = client.db('MindMagic').collection('Users');
        const schema = {
            userName: userName,
            firstName: firstName
        };

        const findById = await request.findOne({
            _id: ObjectId(userId)
        });

        if (!findById) {
            console.log(findById);
            return Promise.reject('Invalid request. Not found');
        }

        const findUpdate = await request.updateOne({
            _id: ObjectId(userId)
        }, {
            $set: {
                userName: userName,
                firstName: firstName,
                lastName: lastName,
            }
        });
        if (await findUpdate.result.nModified === 1) {
            return Promise.resolve(`Record updated.`);
        }

    } catch (error) {

        return Promise.reject(`DB Error: ${error}`);
    } finally {
        client.close();
    }
};
const findById = async (userId) => {

    const client = new MongoClient(dbConfig, {
        useNewUrlParser: true
    });
    client.on('err', err => {
        return Promise.reject(err);
    });
    try {
        await client.connect();
        const request = client.db('MindMagic').collection('Users');

        const result = await request.findOne({
            _id: ObjectId(userId)
        });

        return Promise.resolve(result);

    } catch (error) {
        return Promise.reject(`DB Error: ${error}`);

    } finally {
        client.close();
    }
};
const resetPassword = async (userId, newPassword) => {
    const client = new MongoClient(dbConfig, {
        useNewUrlParser: true
    });
    client.on('err', err => {
        return Promise.reject(err);
    });
    try {
        await client.connect();
        const request = client.db('MindMagic').collection('Users');

        const findUpdate = await request.updateOne({
            _id: ObjectId(userId)
        }, {
            $set: {
                password: newPassword,
            }
        });
        if (await findUpdate.result.nModified === 1) {
            return Promise.resolve(`Password updated successfully.`);
        }

    } catch (error) {
        return Promise.reject(`DB Error: ${error}`);
    } finally {
        client.close();
    }
};

module.exports = {
    getAll,
    register,
    updateProfile,
    findUserName,
    resetPassword,
    findById
};