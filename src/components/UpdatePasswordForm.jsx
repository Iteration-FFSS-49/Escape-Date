import React, {useState} from 'react';
import axios from 'axios';
import Message from './Message.jsx';
import '../stylesheets/AddContactForm.scss'


const UpdatePasswordForm = ({username, setPasswordUpdate}) => {
  const [showMessage, setShowMessage] = useState([]);

  const handleSubmit = async (e) => {
    if(e.target[0].value !== e.target[1].value){
      setShowMessage([<Message text ="Passwords do not match" key = {"1231231231"}/>]);
      return;
    }
    const password = e.target[0].value;
    //LALALAL

    e.preventDefault()
    setPasswordUpdate(false);
    try {
      await axios.patch('/server/changePassword', {username, password})
      return;
    }catch(err){
      return;
      }
  }
  return (
    <div>
      <form id='addContact' onSubmit={(e)=>handleSubmit(e)}>
        <input type = 'password' placeholder="New password..." required></input>
        <input type = 'password' placeholder="Confirm new password..." required></input>
        <button>Submit</button>
      </form>
      {(showMessage.length === 1) ? showMessage : []}
    </div>
  );
};

export default UpdatePasswordForm;