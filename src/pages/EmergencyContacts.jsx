import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Contact from '../components/Contact.jsx';
import '../stylesheets/EmergencyContacts.scss';
import AddContactForm from '../components/AddContactForm.jsx';
import axios from 'axios';


const mapStateToProps = ({ dateState :  currentUser}) => (
  { ...currentUser}
);

const EmergencyContacts = (props) => {
  console.log('EmergencyContacts', props.currentUser.em);
  //set state to add contact form
  const [addContactForm, setAddContactForm] = useState([]);
  const [showContacts, setShowContacts] = useState([]);
  const [numDeleted, setNumDeleted] = useState(0);

  // handle the on click function for adding
  const addContact = () => {
    console.log('clicking');
    setAddContactForm([<AddContactForm 
      key= {1} 
      username={props.currentUser.username}
      setAddContactForm = {setAddContactForm}
      />]);
  }
  useEffect( async () => {
    try{
      const res = await axios.get(`/server/contacts/${props.currentUser.username}`)
      console.log(res);
      setShowContacts(res.data.contacts.map((el, i ) => <Contact 
        key = {el.name + i} 
        name = {el.name} 
        phone = {el.phone}
        username = {props.currentUser.username}
        numDeleted = {numDeleted}
        setNumDeleted = {setNumDeleted}
      />))
    }catch(err){
      console.log('fetching contacts err', err)
      return;
    }
  },[addContactForm, numDeleted])

  return (
    <div>
      <h2>My Emergency Contacts</h2>
      <div className = 'AddContactContainer'>
        <button onClick= {addContact}>Add Contact</button>
        {addContactForm}
      </div>
      {/* {props.currentUser.em.map((el, i) => <Contact key = {el.name + i} name = {el.name} phone = {el.phone}/>)} */}
      {showContacts}
    </div>
  );
};


export default connect(mapStateToProps, null)(EmergencyContacts);