import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../stylesheets/AccountPage.scss'
import axios from 'axios'
import Message from '../components/Message.jsx'


const mapStateToProps = ({ dateState }) => ({
  currentUser: dateState.currentUser
});

const AccountPage = (props) => {
 
  const [showMessage, setShowMessage] = useState(false);

  console.log('props from accountpage.jsx', props);

  const handleSOS = () => {
    axios.get(`/server/sos`, {
      params: {
        username: props.currentUser.username,
        name: props.currentUser.name
      }
    }).then((data) => {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false),2000)
    })
  }

  return (
    <div className='linkButtons'>
      <h2> My Account</h2>
      <Link className='link' to='/myAccount/newDate'><button className='accountButtons'>Make A New Date</button></Link>
      <Link className='link' to='/myAccount/manageDates'><button className='accountButtons'>My Dates</button></Link>
      <Link className='link' to='/myAccount/emergencyContacts'><button className='accountButtons'>My Emergency Contacts</button></Link>
      <Link className='link' to='/myAccount/editInfo'><button className='accountButtons'>My Info</button></Link>
      <button className='accountButtons SOS' onClick={handleSOS}>SOS</button>
      {showMessage ? <Message text = 'Your SOS has been sent'/> : []}
    </div>
  );
};
export default connect(mapStateToProps, null)(AccountPage);
