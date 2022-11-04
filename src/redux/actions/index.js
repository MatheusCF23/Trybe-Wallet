// Coloque aqui suas actions.
export const EMAIL = 'EMAIL';
export const USER_API = 'USER_API';
export const USER_EXPENSES_API = 'USER_EXPENSES_API';
export const USER_CONVERTED_VALUE = 'USER_CONVERTED_VALUE';

export const Email = (payload) => ({ type: EMAIL, payload });
export const api = (payload) => ({ type: USER_API, payload });
export const expensesApi = (payload) => ({ type: USER_EXPENSES_API, payload });
export const convertedValue = (payload) => ({ type: USER_CONVERTED_VALUE, payload });

export const getApi = () => async (element) => {
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await request.json();
    element(api(data));
  } catch (error) {
    throw new Error(error);
  }
};
