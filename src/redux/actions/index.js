const LOGIN_USER = 'LOGIN_USER';

const loginUserAction = (emailUser) => ({
  type: LOGIN_USER,
  emailUser,
});

export default loginUserAction;
