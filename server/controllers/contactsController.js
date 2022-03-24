const { values } = require("regenerator-runtime");
const db = require("../../database/model");



const contactsController = {};
const getId = async (username) => {
  const queryObj = {
    text: 'SELECT u.id FROM users u WHERE u.username = $1',
    values: [username]
  };
  try { 
    const dbRes = await db.query(queryObj);
    return dbRes.rows[0].id

  }catch(err) {
    return next({
      log: 'error getting id',
      message: {err}
    })
  }
}
contactsController.addContact = async (req, res, next) => {
  // get the id from the username
  const id = await getId(req.body.username);
  const {name, phone} = req.body;
  // add the new emergency contact to the contacts table with id
  const queryObj = {
    text: `INSERT INTO contacts (user_id, name, phone) VALUES ($1, $2, $3)`,
    values: [id, name, phone ]
  }
  try {
    const dbRes = await db.query(queryObj);
  }catch(err){
    return next({
      log: 'error in contactsController.addContact',
      message: {err}
    })
  }
  console.log(id);
  console.log('add contacts middleware');
  return next();
}

contactsController.getContacts = async (req, res, next) => {
  let username;
  if (req.query.username) {
    username = req.query.username
  } else username = req.params.username; 
  
  console.log('this is in contact controller: req.params is', req.params)
  console.log('this is in contact controller: req.query is', req.query)
  console.log(username);
  try{
    const id = await getId(username); 
    const queryObj = {
      text: 'SELECT name, phone from contacts WHERE contacts.user_id = $1',
      values:[id]
    }
    const dbRes = await db.query(queryObj);
    console.log(dbRes.rows);
    res.locals.contacts = dbRes.rows;
    res.locals.username = username;
    next();

  }catch(err){
    return next({
      log: 'error in contactsController.getContacts',
      message: {err}
    })
  }
}


contactsController.deleteContact = async(req, res, next) => {
  const {username, name, phone} = req.body
  console.log('username', username);
  console.log('name', name);
  console.log('phone', phone);
  try{
    const id = await getId(username);
    console.log('id', id);
    const queryObj = {
      text: `DELETE FROM contacts WHERE user_id = $1 AND name = $2 AND phone = $3`,
      values: [id, name, phone]
    }
    await db.query(queryObj);
    return next();
  }catch(err){
    return next({
      log: 'error in contactsController.deleteContacts',
      message: {err}
    })
  }
}

contactsController.updateContact = async (req, res, next) => {
  const {username, oldPhone, oldName, newPhone, newName} = req.body
  try {
    const id = await getId(username);
    const queryObj = {
      text: `UPDATE contacts
      SET phone = $1, name = $2
      WHERE user_id = $3 AND phone = $4 AND name = $5`,
      values: [newPhone, newName, id, oldPhone, oldName,]
    };
    await db.query(queryObj)
    return next();
  }catch(err){
    return next({
      log: 'error in contactsController.updateContact',
      message: {err}
    })
  }
}


module.exports = contactsController;