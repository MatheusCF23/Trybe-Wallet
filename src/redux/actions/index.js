// Coloque aqui suas actions.
export const GET_EMAIL = 'GET_EMAIL';
export const GET_API = 'GET_API';
export const GET_EXPENSES_API = 'GET_EXPENSES_API';
export const GET_CONVERTED_VALUE = 'GET_CONVERTED_VALUE';
export const DELETE_ITEM = 'DELETE_ITEM';
export const CHANGE_TOTAL = 'CHANGE_TOTAL';

export const getEmail = (payload) => ({ type: GET_EMAIL, payload });
export const API = (payload) => ({ type: GET_API, payload });
export const expensesApi = (payload) => ({ type: GET_EXPENSES_API, payload });
export const getConvertedValue = (payload) => ({ type: GET_CONVERTED_VALUE, payload });
export const deleteItem = (payload) => ({ type: DELETE_ITEM, payload });
export const changeTotal = (payload) => ({ type: CHANGE_TOTAL, payload });

export const getFetch = () => async (api) => {
  try {
    const RESPONSE = await fetch('https://economia.awesomeapi.com.br/json/all');
    const DATA = await RESPONSE.json();
    api(API(DATA));
  } catch (error) {
    throw new Error(error);
  }
};
