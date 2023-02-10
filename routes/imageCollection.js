const router = require('express').Router();
let Images = require('../models/imageCollections.model');

router.route('/').get((req, res) => {
    console.log(req.params);
    return Images.find({ user_id: 'password123' })
        .then(user => {
            console.log(user),
                res.json(user)
        })
        .catch(err => console.log(err))
})

router.route('/add').post((req, res) => {
    const { url, description, thumbnail, name, userId } = req.body
    const image = new Images({
        url: url,
        description: description,
        thumbnail: thumbnail,
        name: name,
        user_id: userId
    })
    image.save((err, doc) => {
        if (err) return res.status(400).send({ success: false, err });
        return res.status(200).send({
            success: true,
            image: doc,
            msg: 'image add successfully'
        });
    })
})

module.exports = router