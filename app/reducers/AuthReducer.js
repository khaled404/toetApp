import * as Types from '../actions/AuthTypes';
const INITIAL_STATE = {
  isLoggedIn: false,
  skipLogin: false,
  firstname: '',
  lastname: '',
  email: '',
  telephone: '',
  newsLetter: '',
  addresses: {},
  activeAddress: {},
  registerForm: {
    error_firstname: '',
    error_lastname: '',
    error_email: '',
    error_telephone: '',
    error_password: '',
    error_confirm: '',
  },
  loading: false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  const newState = {...state};
  switch (action.type) {
    case Types.LOADING_STARTED:
      newState.loading = true;
      break;
    case Types.LOADING_FAILED:
      newState.loading = false;
      break;

    case Types.TOGGLE_NEWSLETTER:
      newState.newsLetter = action.payload;
      break;
    case Types.LOAD_AUTH_DATA:
      newState.firstname = action.payload.firstname;
      newState.lastname = action.payload.lastname;
      newState.email = action.payload.email;
      newState.telephone = action.payload.telephone;
      newState.newsLetter = action.payload.newsletter;
      break;
    case Types.LOG_USER_IN:
      newState.isLoggedIn = true;
      break;
    case Types.LOG_USER_OUT:
      return {...INITIAL_STATE};
    case Types.REGISTER_FAILS:
      newState.registerForm = {...newState.registerForm, ...action.payload};
      break;
    case Types.SKIP_LOGIN:
      newState.skipLogin = action.payload;
      break;
  }

  return newState;
};

export default AuthReducer;
