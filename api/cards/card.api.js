const app = require('../../app').app;
const auth = require('../../components/userAuth');
const cardService = require('../../services/cards/card.service');


app.get('/api/user/cards/getallcards/:id', (req, res) => {

    cardService.getAllCards(req.params.id).then(body => {
        res.send(body);

    }).catch(err => {
        res.status(400).send(err);
    });
});
app.post('/api/user/cards/newcard/', (req, res) => {

    cardService.newCard(req.body).then(body => {
        res.send(body);

    }).catch(err => {
        res.status(400).send(err);
    });
});
app.post('/api/user/cards/deletecard/', (req, res) => {

    cardService.delCard(req.body).then(body => {
        res.send(body);

    }).catch(err => {
        res.status(400).send(err);
    });
});
app.post('/api/user/cards/renamecard/', (req, res) => {

    cardService.renameCard(req.body).then(body => {
        res.send(body);

    }).catch(err => {
        res.status(400).send(err);
    });
});