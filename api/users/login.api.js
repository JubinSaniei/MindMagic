const app = require('../../app').app;
const auth = require('../../components/userAuth');
const userService = require('../../services/users/login.service');


// app.get('/api/captcha', (req, res) => {

//     userService.captcha().then(body => {
//         res.send(body);

//     }).catch(err => {
//         res.status(400).send(err);
//     });
// });
app.get('/api/user/getall', (req, res) => {

    userService.getAll().then(body => {
        res.send(body);

    }).catch(err => {
        res.status(400).send(err);
    });
});
app.post('/api/user/register', (req, res) => {
    userService.register(req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400).send(err);
    });
});
app.post('/api/user/updateProfile', (req, res) => {
    userService.updateProfile(req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400).send(err);
    });
});
app.post('/api/user/login', (req, res) => {
    userService.login(req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400).send(err);
    });
});
app.post('/api/user/resetpassword', (req, res) => {
    userService.resetPassword(req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400).send(err);
    });
});