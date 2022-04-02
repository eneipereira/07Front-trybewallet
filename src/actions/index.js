export const LOGIN = 'LOGIN';
export const CURRENCY_REQUEST = 'CURRENCY_REQUEST';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDITED_EXPENSE = 'EDITED_EXPENSE';

export const userLogin = (user) => ({ type: LOGIN, user });

const requestCurrency = () => ({ type: CURRENCY_REQUEST });

const getCurrency = (currencies) => ({
  type: REQUEST_SUCCESS,
  payload: currencies,
});

const requestFailed = (error) => ({
  type: REQUEST_FAILURE,
  payload: error.message,
});

export const saveExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const editedExpense = (expense) => ({
  type: EDITED_EXPENSE,
  payload: expense,
});

const URL = 'https://economia.awesomeapi.com.br/json/all';

export const fetchCurrencies = () => (
  async (dispatch) => {
    dispatch(requestCurrency());
    try {
      const response = await fetch(URL);
      const data = await response.json();
      delete data.USDT;
      if (data) {
        dispatch(getCurrency(data));
      } else {
        throw new Error('Request failed! Please refresh the page!');
      }
    } catch (error) {
      dispatch(requestFailed(error));
    }
  }
);
