import reducer from '../src/reducers/dateReducer.js';


describe('dateReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      hasSignedIn: false,
      emergencyContacts: [],
      primaryContact: null,
      phoneNumber: null,
      name: '',
      location: '',
      nameOfDate: '',
      timeOfDate: '',
      dateStatus: null,
      interval: null,
    };
  });

  describe('default state', () => {
    it('should return default state when given an undefined input', () => {
      expect(reducer(undefined, { type: undefined })).toEqual(state);
    });
  });

  describe('unrecognized action types', () => {
    it('should return the original state', () => {
      const action = { type: "Hoon'sAlphaMeter" }
      expect(reducer(state, action)).toEqual(state)
    });
  });

  describe('LOG_IN', () => {
    const action = {
      type: 'LOG_IN',
      payload: {
        data: {
          name: 'Lina',
          phone: '000-000-0000',
          em1_name: 'Hoon',
          em1_phone: '111-111-1111',
          em2_name: 'Sung',
          em2_phone: '222-222-2222',
          em3_name: 'Bryan',
          em3_phone: '333-333-3333'
      }}
    }

    it('does not return original state', () => {
      expect(reducer(state, action)).not.toEqual(state)
    });
    it('should update state with payload information', () => {
      console.log(reducer(state,action));
      expect(reducer(state, action)).toEqual({
        ...state,
        hasSignedIn: true,
        name: 'Lina',
        emergencyContacts: [{name: 'Hoon', phone: '111-111-1111'},
        {name: 'Sung', phone: '222-222-2222'},
        {name: 'Bryan', phone: '333-333-3333'}],
        phoneNumber: '000-000-0000'
      })
    })
  })
  describe('NEW_DATE_INSTANCE', () => {
    const action = {
      type: 'NEW_DATE_INSTANCE',
      payload: {
        location: 'HERE',
        nameOfDate: "Barney",
        timeOfDate: "Now",
        dateStatus: "Failed",
        primaryContact: "Police",
        interval: "15min"
      }
    }
    it('should not return original state', () => {
      expect(reducer(state, action)).not.toEqual(state)
    })
    it('should update state with payload information', () => {
      expect(reducer(state, action)).toEqual({
        ...state,
        location: 'HERE',
        nameOfDate: "Barney",
        timeOfDate: "Now",
        dateStatus: "Failed",
        primaryContact: "Police",
        interval: "15min"
      })
    })
  })
});