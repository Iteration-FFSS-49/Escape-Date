import React from 'react';
import '../stylesheets/Contact.scss'
const Contact = ({name, phone}) => {
  return (
    <div id = "contact">
      <p>Name: {name.charAt(0).toUpperCase() + name.slice(1)}</p>
      <p>#: {phone}</p>
    </div>
  );
};

export default Contact;