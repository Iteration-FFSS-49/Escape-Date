import * as types from '../constants/actionTypes'; 
import axios from 'axios';


//make our action objects;


export const logIn = (data) => dispatch => {
    dispatch({
        type: types.LOG_IN,
        payload: data,
    });
};

export const signUp = (currentUser) => dispatch => {
  dispatch({
    type: types.LOG_IN,
    payload: currentUser
  })
}

export const logOut = () => dispatch => {
  dispatch({
    type: types.LOG_OUT,
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