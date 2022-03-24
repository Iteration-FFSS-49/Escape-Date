const express = require('express');
const router = express.Router();
const UserController =  require ('../controllers/userController.js')
//import dateControlller

router.post('/newUser', UserController.createUser, (req, res) => {
    console.log('sending newUser response after creating account')
    return res.status(200).json({message: "created user"});
    //header('Access-Control-Allow-Origin', '*')
})

router.post('/login', UserController.logIn, (req, res) => {
    return res.status(200).json(res.locals.user)
} )

//create a route to /newDate endpoint passing in date controller

// router.post('/newDate', DateController.middleare, (req, res)=>{

// })


module.exports = router