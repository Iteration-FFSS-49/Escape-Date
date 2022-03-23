const { query } = require("express");
const db = require("../../database/model");
const bcrypt = require('bcrypt');

const UserController = {};

UserController.create = (req, res, next) => {

  console.log('Here is a body, and hopefully its here ', req.body);
  
  const username = req.body.username;
  const password = req.body.password;
  const rounds = 10;

// let hspw;
bcrypt.genSalt(rounds, function(err, salt){
  if (err){
    throw err
  } else {
    bcrypt.hash(password, salt, function(err, hash){
      if (err) {
        throw err
      } else {
        // hspw = hash;
        // console.log(hspw, 'password success?', hash);
        const queryString = `INSERT INTO users 
        (username, password, name, phone, 
        em1_name, em1_phone, em2_name,
        em2_phone, em3_name, em3_phone)
        VALUES ('${req.body['username']}', 
        '${hash}', 
        '${req.body['name']}', 
        '${req.body['phone']}', 
        '${req.body['em1_name']}', 
        '${req.body['em1_phone']}',
        '${req.body['em2_name']}',
        '${req.body['em2_phone']}', 
        '${req.body['em3_name']}', 
        '${req.body['em3_phone']}')
        RETURNING *;`;

        db.query(queryString)
          .then(() => {
            console.log('WE MADE IT')
            return next();
          })
          .catch((err) => {
            return next(err);
          });
        }
      })
    }
  });
}

//check if user exists in database
UserController.user = (request, response, next) => {
    console.log('request is', request.body)
    const username = request.body.username;
    const password = request.body.password;
    const rounds = 10;

            const queryString = `SELECT * FROM users WHERE username = '${username}';`

            db.query(queryString)
            .then((data) => {
                // console.log('data is', data);
                if (data.rows[0] === undefined) {
                    response.locals.user = {err: 'Username does not exist'}
                    return next();
                };
                bcrypt.compare(password, data.rows[0].password, (err, res) => {
                    // console.log('password is', password);
                    // console.log('real pass', data.rows[0].password)
                    if (err) {
                        console.log(err)
                        return 
                    }
                    if (res === true) {
                        console.log('logged in')
                        response.locals.user = data.rows[0];
                        return next();
                    } else {
                        console.log('incorrect password');
                        response.locals.user = {err: 'Incorrect password'};
                        return next();
                    }
                })
            })
            .catch((errObj) => {
                errObj.log = 'error in controller.signin.user';
                errObj.status = 400;
                errObj.message = {err: 'controller.signIn.user error'};
                return next(errObj);
            })
        }


module.exports = UserController;