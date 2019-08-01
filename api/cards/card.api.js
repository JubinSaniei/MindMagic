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
app.post('/api/user/cards/getAllCardSets/', (req, res) => {
    cardService.getAllCardSet(req.body).then(body => {
        res.send(body);

    }).catch(err => {
        res.status(400).send(err);
    });
});
app.post('/api/user/cards/newDeck/', (req, res) => {

    cardService.newDeck(req.body).then(body => {
        res.send(body);

    }).catch(err => {
        res.status(400).send(err);
    });
});
app.post('/api/user/cards/deleteDeck/', (req, res) => {

    cardService.delDeck(req.body).then(body => {
        res.send(body);

    }).catch(err => {
        res.status(400).send(err);
    });
});
app.post('/api/user/cards/renameDeck/', (req, res) => {

    cardService.renameDeck(req.body).then(body => {
        res.send(body);

    }).catch(err => {
        res.status(400).send(err);
    });
});