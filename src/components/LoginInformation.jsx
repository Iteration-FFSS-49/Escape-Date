import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom'; 
import 'regenerator-runtime/runtime';
import axios from 'axios';

//two text inputs and a submit button. //create an onSubmit handler for the form that sets off our get request for username authentication.

const mapStateToProps = ({ dateState }) => ({
  hasSignedIn: dateState.hasSignedIn,
  emergencyContacts: dateState.emergencyContacts, 
  primaryContact: dateState.primaryContact, 
  name: dateState.name
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
//our login take username and password.

let err = '';

const LoginInformation = props => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.hasSignedIn === true) navigate('/myAccount')
  },[props.hasSignedIn])

  
 return (
  <div className = 'form-container'>
    <form className = 'input-text' onSubmit = {(e) => {
      e.preventDefault();
      const username = e.target[0].value, password = e.target[1].value;
      axios.post('/server/login', {username, password})
      .then((data) => {
        console.log(data); // {}
        if(data.data.err){
          navigate('/errorPage')
        }
        props.logIn(data);
      });
    }}>
      <input type='text' placeholder='username' />
      <input type='password' placeholder='password' />
      <button>login</button>
      <button onClick={() => navigate('/signUp')}> Sign me up please! </button>
    </form>
  </div>
)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginInformation);