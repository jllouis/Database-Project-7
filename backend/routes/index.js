const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('F17336Gteam2', 'nodejsapp', 'team2password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
});

router.get('/test', (req, res) => {
    console.log("testing database connectivity\n");
    sequelize.query("show databases").spread( (result, data) => {
        console.log("Printing result:");
        console.log(result);
        console.log("Printing data:");
        console.log(data);
        res.end();
    })
});
router.post('/availability', (req, res) => {
    sequelize.query(`call Team7_express_train_available("${req.body.date}", "${req.body.city}")`)
        .spread( result => {
            console.log(result);
            res.status(200).send(result);
        })
});

router.post('/reservation', (req, res) => {
    sequelize.query(`call Team7_Reserve_a_train(${req.body.train_id}, "${req.body.date}", "${req.body.passenger_id}",
    ${req.body.num_passengers})`).then(result => {
        res.status(200).end("OK");
    })
});

module.exports = router;
