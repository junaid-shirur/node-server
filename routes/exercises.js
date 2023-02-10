const router = require('express').Router();
let Excercise = require('../models/exercise.model');

router.route('/get').get((req, res) => {
    Excercise.find()
        .then(excercise => res.json(excercise))
        .catch(err => console.log(err))
})

router.route('/add').post((req, res) => {
    console.log(req.body);
    const userName = req.body.userName;
    const description = req.body.description;
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date);

    const newUser = new Excercise({userName, description, duration, date,})
    newUser.save()
        .then(() => res.json('excersice added'))
        .catch(err => console.log(err))
})

module.exports = router