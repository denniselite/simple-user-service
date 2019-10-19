const UserController = require('./controllers/users.controller');

exports.routeConfig = (app) => {
    app.get('/users/:userId', [
        UserController.getById
    ]);
    app.post('/users', [
        UserController.insert
    ])
};