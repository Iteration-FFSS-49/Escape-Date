import * as types from '../constants/actionTypes';

const initialState = {
    hasSignedIn: false,
    emergencyContacts: [],
    primaryContact: null, 
    phoneNumber: null,
    name : '',
    location: '',
    nameOfDate: '',
    timeOfDate: '',
    dateStatus: null, 
    interval: null,
    currentUser: {}
  };

//spin up an initial statye and create a fall through of reducers.a

const dateReducer = ( state = initialState, action) => {
  switch(action.type) {
    case types.LOG_IN : {
      //has signed in, emergency contact/primary, name of user.
      //console.log('at the reducer', action.payload);)
      // action.payload = action.payload.data;
      
      //grab the values for emergency contacts here and put them into an array of objects.
      const arr = [];
      // logic to handle emergency contacts returned from server
      console.log('payload is', action.payload)
      // get the array from what the back end sends us as assign it to emergency Contacts
        return {
          ...state,
          hasSignedIn: true,
          currentUser: action.payload
        }
    }
    
    case types.NEW_DATE_INSTANCE : {
      const { location, nameOfDate, timeOfDate, dateStatus, primaryContact, interval } = action.payload;
      return {
        ...state,
        location, 
        nameOfDate, 
        timeOfDate, 
        dateStatus, 
        primaryContact, 
        interval
      }
    }
    default: {
      return state;
    }
  }
}
export default dateReducer;