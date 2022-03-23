const express = require('express');

const router = express.Router();

const newUser = require('../controllers/newUserController')

// The Access-Control-Allow-Origin header is included in the response from one website to a request originating from another website,
// and identifies the permitted origin of the request.
router.post('/newUser', newUser.create, (req, res) => {
    return res.status(200)
    //header('Access-Control-Allow-Origin', '*')
})

//router.delete('/newUser)





module.exports = router;