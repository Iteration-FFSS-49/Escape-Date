import React from 'react';
import { connect } from 'react-redux';
import Contact from '../components/Contact.jsx';


const mapStateToProps = ({ dateState :  currentUser}) => (
  { ...currentUser}
);

const EmergencyContacts = (props) => {
  console.log('EmergencyContacts', props.currentUser.em);

  return (
    <div>
      <h2>My Emergency Contacts</h2>
      {props.currentUser.em.map((el, i) => <Contact key = {el.name + i} name = {el.name} phone = {el.phone}/>)}
    </div>
  );
};


export default connect(mapStateToProps, null)(EmergencyContacts);