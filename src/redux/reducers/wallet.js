// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_API, GET_EXPENSES_API, GET_CONVERTED_VALUE } from '../actions';

const INNITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  convertedValue: 0,
};

const reducerWallet = (state = INNITIAL_STATE, action) => {
  switch (action.type) {
  case GET_API:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((element) => element !== 'USDT'),
    };
  case GET_EXPENSES_API:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case GET_CONVERTED_VALUE:
    return {
      ...state,
      convertedValue: state.convertedValue + action.payload,
    };
  default:
    return state;
  }
};

export default reducerWallet;
