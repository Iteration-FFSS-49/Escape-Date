import React, {useState} from 'react';
import '../stylesheets/EditInfo.scss';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import UpdatePasswordForm from '../components/UpdatePasswordForm.jsx';
import { bindActionCreators } from 'redux';
import Message from '../components/Message.jsx';
import {useNavigate} from 'react-router-dom';

const mapStateToProps = ({ dateState }) => ({
  currentUser: dateState.currentUser
})
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const EditInfo = (props) => {
  const {username} = props.currentUser
  const navigate = useNavigate();
  const [passwordUpdate, setPasswordUpdate] = useState(false);
  const [showLogOutMessage, setShowLogOutMessage] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const handlePasswordClick = () => {
    setPasswordUpdate(!passwordUpdate);
  }

  const handleLogOut = () => {
    setShowLogOutMessage(true);
    setTimeout(() => {
      setShowLogOutMessage(false);
      props.logOut();
      navigate('/');
    }, 2000)
  }
  const handleDelete = () => {
    setShowDeleteMessage(true);
    setTimeout(() => {
      setShowDeleteMessage(false);
    }, 2000)
  }
  return (
    <div className = "EditInfo">
      <h2>My Info</h2>
      <button onClick = {handlePasswordClick}>Change Password</button>
      {passwordUpdate ? <UpdatePasswordForm 
      setPasswordUpdate = {setPasswordUpdate}
      username = {username}
      /> : []}
      <button id = "logout" onClick = {handleLogOut}>Logout</button>
      {showLogOutMessage ? <Message text = "You will be signed out in 2 sec"/> : []}
      <button id ="delete" onClick = {handleDelete}>Delete Account</button>
      {showDeleteMessage ? <Message text = 'You cannot delete your account'/> : []}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInfo);