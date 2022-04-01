import {
  CURRENCY_REQUEST,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  ADD_EXPENSE,
  REQUEST_EXCHANGE,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currency: 'BRL',
  currencies: [],
  expenses: [],
  isLoading: false,
  error: null,
  exchangeRates: {},
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_REQUEST:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload),
      isLoading: false,
    };
  case REQUEST_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REQUEST_EXCHANGE:
    return {
      ...state,
      exchangeRates: action.payload,
      isLoading: false,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  default:
    return state;
  }
};

export default walletReducer;
