const UserController = require('./controllers/users.controller');

exports.routeConfig = (app) => {
    app.post('/users', [
        UserController.insert
    ])
};