const router = require('express').Router();
const { validateToken } = require('../auth/authService');
let Images = require('../models/imageCollections.model');

router.route('/').get((req, res) => {
    return Images.find({ user_id: 'password' })
        .then(images => {
                res.json(images)
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

router.route('/delete').delete((req, res) => {
    Images.deleteMany({ "_id": { "$in": req.body } }, (err, resp) => {
        if (err) return res.status(400).send({ success: false, err });
        if (resp.deletedCount == 0) return res.status(500).send({ success: false, msg: 'could not find selected images' })
        return res.status(200).send({ success: true, msg: 'delete image successfull' })
    })
})

router.route('/fav').post((req, res) => {
    const { imgIds, add } = req.body
    Images.updateMany({
        "_id": { "$in": imgIds }
    },
        { "$set": { favourite: add ? true : false } },
        { upsert: true },
        (err, resp) => {
            if (err) return res.status(400).send({ success: false, err });
            if (resp.matchedCount == 0) return res.status(500).send({ success: false, msg: 'could not find selected images' })
            console.log(resp, 'resp');
            return res.status(200).send({ success: true, msg: resp.modifiedCount + 'images added to the favourites' })
        })
})

module.exports = router