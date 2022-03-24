import React from 'react';
import axios from 'axios';
import Message from './Message.jsx';
import '../stylesheets/AddContactForm.scss'


const AddContactForm = ({username, setAddContactForm}) => {

  const handleSubmit = async (e) => {
    console.log(e.target[0].value);
    const name = e.target[0].value;
    console.log(e.target[1].value);
    const phone = e.target[1].value;
    console.log(username);
    e.preventDefault()
    try {
      await axios.post('/server/contacts/add', {username, name, phone})
      setAddContactForm([<Message 
        key = {'GOOD' + 123123} 
        text ='Success'
      />])
      setTimeout(() => {setAddContactForm([])}, 1000);
      return;
    }catch(err){
      setAddContactForm([<Message 
        key = {'BAD' + 112312312} 
        text ='Something went wrong. Please try again'
      />])
      return;
      }
  }
  return (
    <div>
      <form id='addContact' onSubmit={(e)=>handleSubmit(e)}>
        <input type = 'text' placeholder="Name..." required></input>
        <input type = 'text' placeholder="Phone..." required></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddContactForm;