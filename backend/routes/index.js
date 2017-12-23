var express = require('express');
var router = express.Router();
const Knex = require('knex');
const prompt = require('prompt');

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('F17336Gteam2', 'nodejsapp', 'team2password',
//     {
//         host: 'localhost',
//         dialect: 'mysql'
//     },)

prompt.start();

const config = {
    user: 'nodejsapp',
    password: 'team2password',
    database: 'F17336Gteam2',
    host: '127.0.0.1'
};



// Connect to the database
const knex = Knex({
    client: 'mysql',
    connection: config
});

console.log("setup complete");

router.post('/availability', (req, res) => {
    console.log("calling SP train_available");
    // console.log(`Sending: call Team7_express_train_available('${req.body.date}', "${req.body.city}")`);
    knex.raw(`call Team7_express_train_available(${req.body.date}, ${req.body.city})`)
        .then( result => {
            console.log(result);
            res.send(200).end();
        })
});

router.post('/reservation', (req, res) => {
    console.log("Calling Team7_Reserve_a_train(trainid, date,passengerid, nr_passengers)");
    knex.raw(`call Team7_Reserve_a_train(${req.body.train_id}, ${req.body.date}, ${req.body.passenger_id},
    ${req.body.num_passengers});`)
        .then( result => {
            console.log(result);
            res.send(200).end();
        })
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
