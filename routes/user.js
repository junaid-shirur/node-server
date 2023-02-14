const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require ('bcrypt');
const { generateAccessToken, generateRefreshToken, validateToken } = require('../auth/authService');


// router.route('/').get(validateToken,(req, res) => {
//     // console.log(req);
//     return false
// })

// get all users
router.route('/').get((req, res) => {
    User.findById(req.user.id)
        .then(user => res.json(user))
        .catch(err => console.log(err))
})
// add user
router.route('/create').post(async (req, res) => {
    const userName = req.body.userName;
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({ userName: userName, password: hashedPassword })
    newUser.save()
        .then(() => res.json('user added'))
        .catch(err => console.log(err), res.status(500).send('There was a problem registering the user'))
})
// get single user
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch(err => console.log(err))
})

// delete user
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('user deleted'))
    .catch(err => console.log(err))
})

// update user
router.route('/:id').put((req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            user.userName = req.body.userName
            user.save().then(() => console.log('user updated'))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})


router.route('/login').post(async (req, res) => {

    const user = await User.collection.findOne({ "userName": req.body.username })
    
    const isValid = user?.password ? await bcrypt.compare(req.body.password, user?.password) : false
    //check to see if the user exists in the list of registered usersif (user == null) res.status(404).send ("User does not exist!")
    if (isValid) {
        const accessToken = generateAccessToken({ user: req.body.name, id: user._id })
        const refreshToken = generateRefreshToken({ user: req.body.name, id: user._id })

        // ToDo: set accessToken and refreshToken in cookies 
        res.cookie('accessToken',accessToken)
        res.cookie('refreshToken',refreshToken)
        // res.redirect('/users/me')
        res.json({ accessToken: accessToken, refreshToken: refreshToken })
    } else {
        res.status(401).send("Password or username is Incorrect!")
    }
})


router.route('/refreshToken').post(async (req, res) => {
    if (!refreshTokens.includes(req.body.token)) res.status(400).send("Refresh Token Invalid")

    refreshTokens = refreshTokens.filter((c) => c != req.body.token)
    const accessToken = generateAccessToken({ user: req.body.name })
    const refreshToken = generateRefreshToken({ user: req.body.name })
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

router.route('/logout').get(async (req, res) => {

    res.cookie('accessToken', '', { maxAge: 0 })
    res.cookie('refreshToken', '', { maxAge: 0 })
    res.send('user logged out')
})

module.exports = router