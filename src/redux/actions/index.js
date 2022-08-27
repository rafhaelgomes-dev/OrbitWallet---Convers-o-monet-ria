const LOGIN_USER = 'LOGIN_USER';
const API_DATA = 'API_DATA';
const loginUserAction = (emailUser) => ({
  type: LOGIN_USER,
  emailUser,
});

export const apiData = (data) => ({
  type: API_DATA,
  data,
});

export const fetchAwesomeApi = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  return dispatch(apiData(data));
};

export default loginUserAction;
