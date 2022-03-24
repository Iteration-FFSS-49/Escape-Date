const { query } = require("express");
const db = require("../../database/model");
const bcrypt = require('bcrypt');

const UserController = {};

UserController.createUser = (req, res, next) => {

  console.log('Here is a body, and hopefully its here ', req.body);
  
  const username = req.body.username;
  const password = req.body.password;
  const rounds = 10;

  // let hspw;
  bcrypt.genSalt(rounds, function(err, salt){
    if (err){
      throw err
    } else {
        bcrypt.hash(password, salt, async (err,hash) => {
          if (err) {
            throw err
          } else {
            console.log('bcrypt')
            // hspw = hash;
            // console.log(hspw, 'password success?', hash);
            //     CREATE TABLE users (
            //   username, password, name, phone, 
            // em1_name, em1_phone, em2_name,
            // em2_phone, em3_name, em3_phone
            // )
            
            const queryStringUsers = {
              text: 'INSERT INTO users (username, password, name, phone) VALUES ($1, $2, $3, $4)',
              values: [req.body.username, hash, req.body.name, req.body.phone]
            }
            
            const queryStringPrimaryId = {
              text: `SELECT users.id FROM users WHERE users.username = $1`,
              values: [req.body.username]
            };
            // 1. query and INSERT username, password, phone
            //creates the primary key
            // 2. query SELECT the primary key 
            
            // 3. query and INSERT into contacts table
            try {
              await db.query(queryStringUsers);
              const dbRes = await db.query(queryStringPrimaryId);
              res.locals.id = dbRes.rows[0].id;
              console.log(`before for loop ${dbRes.rows[0].id}`) 
              for (let i = 0; i < req.body.em.length; i++) {
                console.log(`index at ${i}`)
                const queryStringContacts = {
                  text: 'INSERT INTO contacts (user_id, phone, name) VALUES ($1, $2, $3)',
                  values: [res.locals.id, req.body.em[i].objectPhone, req.body.em[i].objectName]
                }
                await db.query(queryStringContacts);
  
              }
              // await db.query(queryStringContacts);
              console.log("at line 60, about to exit for loop")
              return next();
            }
            catch(err) {
              return next({
                log: 'error in createUser',
                message: {err}
              });
            }
            // db.query(queryStringUsers)
            // .then((data) => {
            //   console.log('WE MADE IT')
            //   //return next();
            // })
            // .catch((err) => {
            //   return next({
            //     log: 'error in db.query(queryStringUsers)',
            //     message: {err}
            //   });
            // });

            
            // const findId = db.query(queryStringPrimaryId)
            // .then((data) => {
            //   res.locals.id = data.rows;
            //   console.log('res.locals.id', res.locals.id);
            // }).catch(err => {
            //   return next({
            //     log: 'error getting primary id',
            //     message: {err}
            //   })
            // });

            // for (let i = 0; i < req.body.em; i++){
            //   const { em } = req.body.em
            //   const queryString = `INSERT INTO contacts(user_id, phone, name)
            //   VALUES (${findId}, ${em[i].objectPhone}, ${em[i].objectName})`
            //   db.query(queryString)
            //   .then(() => {
            //     return next();
            //   })
            //   .catch((err) => {
            //     return next({
            //       log: 'error inserting into contacts',
            //       message: {err}
            //     });
            //   });
            // };
            }
        })
      }
  });
}

//check if user exists in database
UserController.logIn = (request, response, next) => {
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