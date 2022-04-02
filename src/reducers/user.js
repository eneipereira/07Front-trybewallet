import { LOGIN } from '../actions';

const initialEmail = () => {
  const user = localStorage.getItem('user-email');
  let email = '';
  if (user) {
    email = JSON.parse(user);
  }
  return email;
};

const INITIAL_STATE = {
  email: initialEmail(),
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    localStorage.setItem('user-email', JSON.stringify(action.user));
    return {
      ...state,
      email: action.user,
    };
  default:
    return state;
  }
};

export default userReducer;
