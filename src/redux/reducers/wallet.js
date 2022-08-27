const ESTADO_INICIAL = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
  case 'API_DATA': {
    const arrayData = [...Object.keys(action.data)];
    return {
      ...state,
      currencies: arrayData.filter((e) => e !== 'USDT'),
    };
  }
  default:
    return state;
  }
};

export default wallet;
