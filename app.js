const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const UsersRouter = require('./users/routes.config');

app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        next();
    }
});

app.use(bodyParser.json())
app.use(morgan('dev'));
UsersRouter.routeConfig(app)

app.listen(3000, () => {
    console.log("Server running on port 3000");
});