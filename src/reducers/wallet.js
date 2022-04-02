import {
  CURRENCY_REQUEST,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  EDITED_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currency: 'BRL',
  currencies: [],
  expenses: [],
  isLoading: false,
  error: null,
  exchangeRates: {},
  toBeEdited: {},
  isEditing: false,
};

const editedExpense = (state, action) => ({
  ...state,
  expenses: state.expenses.map((expense) => {
    if (expense.id === state.toBeEdited.id) {
      return {
        ...action.payload,
        exchangeRates: expense.exchangeRates,
        id: expense.id,
      };
    }
    return expense;
  }),
  isEditing: false,
  toBeEdited: {},
});

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
      exchangeRates: action.payload,
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
  case DELETE_EXPENSE: {
    const updatedList = state.expenses.filter((expense) => expense.id !== action.payload);
    return {
      ...state,
      expenses: updatedList,
    };
  }
  case EDIT_EXPENSE:
    return {
      ...state,
      isEditing: true,
      toBeEdited: state.expenses.find((expense) => expense.id === action.payload),
    };
  case EDITED_EXPENSE:
    return editedExpense(state, action);
  default:
    return state;
  }
};

export default walletReducer;
