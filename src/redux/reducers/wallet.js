// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { USER_API, USER_EXPENSES_API, USER_CONVERTED_VALUE } from '../actions';

const INITTIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
  idEdit: 0,
  getConvertion: 0,
};

const walletReducer = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  case USER_API:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((element) => element !== 'USDT'),
    };
  case USER_EXPENSES_API:
    return {
      ...state,
      expenses: action.payload,
    };
  case USER_CONVERTED_VALUE:
    return {
      ...state,
      getConvertion: state.getConvertion + action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
