import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/AccountPage.scss'

const AccountPage = () => {
  return (
    <div className='linkButtons'>
      <h2> My Account </h2>
      <Link className='link' to='/myAccount/newDate'><button className='accountButtons'>Make A New Date</button></Link>
      <Link className='link' to='/myAccount/manageDates'><button className='accountButtons'>My Dates</button></Link>
      <Link className='link' to='/myAccount/emergencyContacts'><button className='accountButtons'>My Emergency Contacts</button></Link>
      <Link className='link' to='/myAccount/editInfo'><button className='accountButtons'>My Info</button></Link>
      <button className='accountButtons SOS'>SOS</button>
    </div>
  );
};

export default AccountPage;