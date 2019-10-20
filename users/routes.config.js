const UserController = require('./controllers/users.controller');

exports.routeConfig = (app) => {
    app.get('/users', [
        UserController.list
    ]);
    app.get('/users/:userId', [
        UserController.getById
    ]);
    app.patch('/users/:userId', [
        UserController.patchById
    ]);
    app.post('/users', [
        UserController.insert
    ])
};