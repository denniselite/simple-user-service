const VerifyUserMiddleware = require('./middlewares/verify.user.middleware')
const AuthorizationController = require('./controllers/authorization.controller')

exports.routeConfig = (app) => {
    app.post('/auth', [
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);
};