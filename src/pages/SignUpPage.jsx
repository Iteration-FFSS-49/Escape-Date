import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import { bindActionCreators } from 'redux'; 
import { useNavigate } from 'react-router-dom';
import '../stylesheets/SignUp.scss';


import EmergencyContact from '../components/EmergencyContact.jsx';
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
      

const SignUpPage = props => {
  // use useState hooks to make this functional component stateful,
  // allowing us to update state in response to user's clicking of 'add emergency contact' button 
  const [additionalEmergencyContacts, setAdditionalEmergencyContacts] = useState([<EmergencyContact num = {1}/>]); // start with one 
  
  const addEmergencyContact = () => {
    // make a shallow copy of additionalEmergencyContacts (state) so that we don't change state directly
    const currentState = [...additionalEmergencyContacts];
    // add to shallow copy of state an instance of EmergencyContact component
    currentState.push(<EmergencyContact num = {currentState.length + 1}/>)
    // invoking setState equivalent function to update state
    setAdditionalEmergencyContacts(currentState);
  };
  
  const navigate = useNavigate();
  
  const submitNewUser = (e) => {
    e.preventDefault(),
    props.signUp(e);
    navigate('/');
    const myState = store.getState();
    console.log(myState);
  } 
  return (
  <div className = 'form-container'>
    <form className = 'sign-up-form' onSubmit= {(e) => {submitNewUser(e)}}>
        <input type = 'text' placeholder = 'username' required/>
        <input type = 'text' placeholder = 'password' required/>
        <input type = 'text' placeholder = 'name' required/>
        <input type='text' placeholder='phone' required/>
        {additionalEmergencyContacts}
        <button type = "submit" >Submit</button>
    </form >
    <button id='addEC' onClick = {addEmergencyContact} >Add Emergency Contact</button>
  </div>
)};

export default connect(null, mapDispatchToProps)(SignUpPage);