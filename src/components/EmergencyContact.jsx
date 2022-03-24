import React from 'react';
import '../stylesheets/EmergencyContact.scss'

const EmergencyContact = ({num}) => {
  return (
    <div className = "EmergencyContact">
      <p id = "title">Emergency Contact </p>
      <div>
        <input type = 'text' placeholder = {`emergency name ${num}`} required/>
        <input type = 'text' placeholder = {`phone number ${num}`} required/>
      </div>
    </div>

  );
};

export default EmergencyContact;