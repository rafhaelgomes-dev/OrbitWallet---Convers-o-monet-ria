const ESTADO_INICIAL = {
  email: '',
};

const LOGIN_USER = 'LOGIN_USER';

const user = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return {
      ...state,
      email: action.emailUser,
    };
  default:
    return state;
  }
};

export default user;
