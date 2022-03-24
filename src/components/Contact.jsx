import React from 'react';
import '../stylesheets/Contact.scss'
import axios from 'axios';
const Contact = ({name, phone, username, numDeleted, setNumDeleted}) => {

  const handleDelete = async () => {
    console.log(username, phone, name);
    try{
      await axios.delete('/server/contacts/delete', {data: {username, name, phone}})
      setNumDeleted(numDeleted + 1)
      return;
    }catch(err){
      console.log(err);
    }

  }

  return (
    <div id = "contact">
      <p id = "name">Name: {name.charAt(0).toUpperCase() + name.slice(1)}</p>
      <p id = "phone">#: {phone}</p>
      <button>Edit</button>
      <button onClick ={handleDelete}>Delete</button>
    </div>
  );
};

export default Contact;