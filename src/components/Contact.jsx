import React, { useState } from 'react';
import '../stylesheets/Contact.scss'
import axios from 'axios';


const Contact = ({name, phone, username, numDeleted, setNumDeleted}) => {

  const [isUpdating, setshowUpdating] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const oldName = name;
    const oldPhone = phone
    const newName = e.target[0].value;
    const newPhone = e.target[1].value;
    console.log(name, phone)
    await axios.patch('/server/contacts/update', {username, oldName, oldPhone, newName, newPhone})
    setTimeout(() => {
      setshowUpdating(false);
      setNumDeleted(numDeleted + 1);
    },500);
    
  }

  const DisplayContact = () => {
    return (
      <React.Fragment>
        <p id = "name">Name: {name.charAt(0).toUpperCase() + name.slice(1)}</p>
        <p id = "phone">#: {phone}</p>
      </React.Fragment>)
  }
  const DisplayEdit = () => {
    return (
      <form id = "DisplayEdit" onSubmit= {e => handleSubmit(e)}>
        <input type="text" placeholder = {name.charAt(0).toUpperCase() + name.slice(1)} required/>
        <input type="text" placeholder = {phone} required/>
        <button>Update</button>
      </form>
    )
  }
  const handleEdit = () => {
    setshowUpdating(!isUpdating)
  }

  return (
    <div id = "contact">
      {isUpdating ? <DisplayEdit/> : <DisplayContact/>}
      <button onClick = {handleEdit}>Edit</button>
      <button onClick ={handleDelete}>Delete</button>
    </div>
  );
};

export default Contact;