import * as types from '../constants/actionTypes'; 
import axios from 'axios';


//make our action objects;


export const logIn = (data) => dispatch => {
    dispatch({
        type: types.LOG_IN,
        payload: data,
    });
};
{/* <input type = 'text' placeholder = 'username'/>
<input type = 'text' placeholder = 'password'/>
<input type = 'text' placeholder = 'name'/>
<input type = 'text' placeholder = 'phone'/>
<input type = 'text' placeholder = 'emergency name 1'/>
<input type = 'text' placeholder = 'emergency number 1'/>
<input type = 'text' placeholder = 'emergency name 2'/>
<input type = 'text' placeholder = 'emergency number 2'/>
<input type = 'text' placeholder = 'emergency name 3'/>
<input type = 'text' placeholder = 'emergency number 3'/> */}
export const signUp = (e) => dispatch => {
  console.log('targets array', e.target)
  const username = e.target[0].value;
  const password = e.target[1].value;
  const name = e.target[2].value;
  const phone = e.target[3].value;
  const emContacts = [];
  // iterate through length-1 of e.target array starting at index=4
  for (let i = 4; i < e.target.length - 1; i+=2){ 
    emContacts.push({name: e.target[i].value, phone: e.target[i+1].value});
  }
  console.log('emContacts array!!!!!', emContacts)

  axios.post('/server/session/newUser',
  { username, password, name, phone, emContacts })
  .then(data => {
    dispatch({
      type: types.SIGN_UP,
      payload: data
    })
  })
}

export const newDateInstance = (e) => dispatch => {
    const location = e.target[0].value; 
    const interval = e.target[1].value; 
    const primaryContact = e.target[2].value; 
    const time = e.target[3].value; 
    const nameOfDate = e.target[4].value;
    const date = e.target[5].value; 
    axios.post('/server/newDateInstance', 
    {location, interval, primaryContact, time, nameOfDate, date})
    .then(data => {
      console.log(data); 
      dispatch({
        type: types.NEW_DATE_INSTANCE,
        payload: { location, interval, primaryContact, time, nameOfDate, date }
      })
    })
}