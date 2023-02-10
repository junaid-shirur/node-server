const router = require('express').Router();
let Excercise = require('../models/exercise.model');
let Movies  = require('../models/movies.model')
router.route('/').get((req, res) => {

    const getmovies = async () => {
     const abc =  await fetch('http://www.omdbapi.com/?apikey=f8e703aa&s=batman&type=movie')
      .then(response => response.json())
      .then(data => console.log(data));
        return abc
    }
    const request = require('request');
request('http://www.omdbapi.com/?apikey=f8e703aa&s=batman&type=movie', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(response.body?.['Search']) 
    // response.body['Search'].map(mov => {
        
    //     const title = mov.Title;
    //     const year = mov.Year;
    //     const imdbID = mov.imdbID
    //     const type = mov.Type
    //     const poster = mov.Poster
    
    //     const movies = new Movies({title, year, imdbID, type, poster})
    //     movies.save()
    //         .then(() => res.json('movies added'))
    //         .catch(err => console.log(err))
    // })
  }
});
    
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