// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_API,
  GET_CONVERTED_VALUE,
  GET_EXPENSES_API,
  CHANGE_TOTAL,
  DELETE_ITEM,
} from '../actions';

const INITTIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
  idEdit: 0,
  convertion: 0,
};

const infoReducer = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  case GET_API:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((id) => id !== 'USDT'),
    };
  case GET_CONVERTED_VALUE:
    return {
      ...state,
      convertedValue: state.convertedValue + action.payload,
    };
  case GET_EXPENSES_API:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case CHANGE_TOTAL:
    return {
      ...state,
      convertedValue: state.convertedValue - action.payload,
    };
  case DELETE_ITEM:
    return {
      ...state,
      expenses: [...state.expenses
        .filter((element) => element.id !== +action.payload.id)],
    };
  default:
    return state;
  }
};

export default infoReducer;
