const LOGIN_USER = 'LOGIN_USER';
const API_DATA = 'API_DATA';
const API_CAMBIO = 'API_CAMBIO';
const DELETA_DESPESAS = 'DELETA_DESPESAS';

const loginUserAction = (emailUser) => ({
  type: LOGIN_USER,
  emailUser,
});

export const deletaDespesas = (despesasFiltradas, valorDespesaDeletada) => ({
  type: DELETA_DESPESAS,
  despesasFiltradas,
  valorDespesaDeletada,
});

export const editDespesas = (despesa, index, valorCambio) => ({
  type: 'EDITAR_DESPESAS',
  despesa,
  index,
  valorCambio,
});

export const saveEditDespesas = (expenses, valorCam, A) => ({
  type: 'SAVE_DESPESAS',
  expenses,
  valorCam,
  A,
});

export const apiData = (data) => ({
  type: API_DATA,
  data,
});

export const apiInformationAndCambio = (Information, Cambio) => ({
  type: API_CAMBIO,
  Information,
  Cambio,
});

export const fetchAwesomeApi = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  return dispatch(apiData(data));
};

export default loginUserAction;
