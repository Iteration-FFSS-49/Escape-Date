const express = require('express');
const router = express.Router();
const UserController =  require ('../controllers/userController.js')

router.post('/newUser', UserController.create, (req, res) => {
    return res.status(200)
    //header('Access-Control-Allow-Origin', '*')
})

router.post('/', UserController.user, (req, res) => {
    return res.status(200).json(res.locals.user)
} )

module.exports = router