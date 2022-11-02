// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_EMAIL } from '../actions';

const INNITIAL_STATE = {
  email: '',
};

const getEmailReducer = (state = INNITIAL_STATE, action) => {
  switch (action.type) {
  case GET_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default getEmailReducer;
