const router = require('express').Router();
let User = require('../user.model');
const bcrypt = require ('bcrypt');
const { generateAccessToken, generateRefreshToken, validateToken } = require('../../auth/authService');
// get all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
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
    console.log(req);
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Credentials', true);
    const user = await User.collection.findOne({ "userName": req.body.username })
    // console.log(user);
    const isValid = await bcrypt.compare(req.body.password, user?.password)
    //check to see if the user exists in the list of registered usersif (user == null) res.status(404).send ("User does not exist!")
    if (isValid) {
        const accessToken = generateAccessToken({ user: req.body.name })
        const refreshToken = generateRefreshToken({ user: req.body.name })

        // res.setHeader('Set-Cookies', [
        //     `accessToken=${accessToken};path=/;secure;httpOnly`,
        //     `refreshToken=${refreshToken};path=/;secure;httpOnly`
        // ])
        res.cookie('accessToken',accessToken)
        res.cookie('refreshToken',refreshToken)

        // res.redirect('/users/me')
        res.json({ accessToken: accessToken, refreshToken: refreshToken })
    } else {
        res.status(401).send("Password Incorrect!")
    }
})


router.route('/refreshToken').post(async (req, res) => {
    if (!refreshTokens.includes(req.body.token)) res.status(400).send("Refresh Token Invalid")

    refreshTokens = refreshTokens.filter((c) => c != req.body.token)
    const accessToken = generateAccessToken({ user: req.body.name })
    const refreshToken = generateRefreshToken({ user: req.body.name })
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})
module.exports = router