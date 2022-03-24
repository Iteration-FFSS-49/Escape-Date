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

            const queryStringUsers = {
              text: 'INSERT INTO users (username, password, name, phone) VALUES ($1, $2, $3, $4)',
              values: [username, hash, req.body.name, req.body.phone]
            }
            
            const queryStringPrimaryId = {
              text: `SELECT users.id FROM users WHERE users.username = $1`,
              values: [username]
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
                  values: [res.locals.id, req.body.em[i].phone, req.body.em[i].name]
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

            //const queryString = `SELECT * FROM users WHERE username = '${username}';`
            const queryObject = {
              text: 'SELECT * FROM users WHERE users.username = $1',
              values: [username]
            }

            db.query(queryObject)
            .then((data) => {
                // console.log('data is', data);
                if (data.rows[0] === undefined) {
                    response.locals.user = {err: 'Username does not exist'}
                    return next();
                };
                bcrypt.compare(password, data.rows[0].password, async (err, res) => {
                    // console.log('password is', password);
                    // console.log('real pass', data.rows[0].password)
                    if (err) {
                        console.log(err)
                        return next({
                          log: 'bcrypt password compare err',
                          message: {err}
                        })
                    }
                    if (res === true) {
                        console.log('logged in')
                        const {username, name, phone, id} = data.rows[0];
                        const queryObj = {
                          text: 'SELECT c.name, c.phone from contacts c WHERE c.user_id = $1',
                          values: [id] 
                        }
                        const dbRes = await db.query(queryObj);
                        response.locals.user = {
                          name: data.rows[0].name,
                          username: data.rows[0].username,
                          phone: data.rows[0].phone,
                          em: dbRes.rows
                        }
                        console.log('res.locals.user', response.locals.user);

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