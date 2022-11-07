export const EMAIL = 'EMAIL';
export const GET_EXPENSES_API = 'GET_EXPENSES_API';
export const GET_API = 'GET_API';
export const GET_CONVERTED_VALUE = 'GET_CONVERTED_VALUE';

export const getEmail = (payload) => ({ type: EMAIL, payload });
export const response = (payload) => ({ type: GET_API, payload });
export const API = (payload) => ({ type: GET_EXPENSES_API, payload });
export const convertedValue = (payload) => ({ type: GET_CONVERTED_VALUE, payload });

export const getApi = () => async (dispatch) => {
  try {
    const RESPONSE = await fetch('https://economia.awesomeapi.com.br/json/all');
    const DATA = await RESPONSE.json();
    dispatch(response(DATA));
  } catch (error) {
    throw new Error(error);
  }
};
