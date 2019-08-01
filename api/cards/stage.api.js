const app = require('../../app').app;
const auth = require('../../components/userAuth');
const stageService = require('../../services/cards/stage.service');


app.post('/api/user/cards/addNew', (req, res) => {

    stageService.addToStage(req.body).then(body => {
        res.send(body);

    }).catch(err => {
        res.status(400).send(err);
    });
});
app.post('/api/user/cards/stages/updateCard', (req, res) => {

    stageService.updateStCard(req.body).then(body => {
        res.send(body);

    }).catch(err => {
        res.status(400).send(err);
    });
});
app.post('/api/user/cards/stages/deleteStageCard', (req, res) => {

    stageService.deleteStCard(req.body).then(body => {
        res.send(body);

    }).catch(err => {
        res.status(400).send(err);
    });
});
app.post('/api/user/cards/stages/answer', (req, res) => {

    stageService.answer(req.body).then(body => {
        res.send(body);

    }).catch(err => {
        res.status(400).send(err);
    });
});
