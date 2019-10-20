const UserController = require('./controllers/users.controller');
const ValidationMiddleware = require ('../common/middlewares/auth.validation.middleware');
const PermissionMiddleware = require ('../common/middlewares/auth.permission.middleware');

const config = require('../common/config/env.config');

const ADMIN = config.permissionsLevels.ADMIN;
const PAID = config.permissionsLevels.PAID_USER;
const FREE = config.permissionsLevels.NORMAL_USER;

exports.routeConfig = (app) => {
    app.delete('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UserController.removeById
    ]);
    app.get('/users', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        UserController.list
    ]);
    app.get('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UserController.getById
    ]);
    app.patch('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UserController.patchById
    ]);
    app.post('/users', [
        UserController.insert
    ])
};