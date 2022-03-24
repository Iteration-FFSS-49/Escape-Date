const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');



router.post('/add',contactsController.addContact, (req,res) => {
  console.log('add contacts');
  return res.status(200).json({message: 'user has been added'});
})

router.get('/:username', contactsController.getContacts, (req,res) => {
  console.log('getting contacts');
  return res.status(200).json({contacts: res.locals.contacts})
})

router.delete('/delete', contactsController.deleteContact, (req,res) => {
  return res.status(200).json({message: 'contact has been deleted'});
})

router.patch('/update', contactsController.updateContact, (req,res) => {
  return res.status(200).json({message: 'contact has been updated'});
})

module.exports = router
