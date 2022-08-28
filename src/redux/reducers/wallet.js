const ESTADO_INICIAL = {
  currencies: [],
  expenses: [],
  total: 0,
  editor: false,
  idToEdit: 0,
};

const API_CAMBIO = 'API_CAMBIO';

const wallet = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
  case 'API_DATA': {
    const arrayData = [...Object.keys(action.data)];
    return {
      ...state,
      currencies: arrayData.filter((e) => e !== 'USDT'),
    };
  }
  case API_CAMBIO: {
    const arrayCambio = Object.entries(action.Cambio);
    const arrayFilterMoedaCambio = arrayCambio.filter((e) => (
      e[0] === action.Information.Moeda
    ));
    const cotacaoAtualDaMoeda = arrayFilterMoedaCambio[0][1].ask;
    const information = action.Information;
    const
      total2 = Number(state.total + cotacaoAtualDaMoeda * information.Valor).toFixed(2);
    return {
      ...state,
      expenses: [...state.expenses, {
        id: information.id,
        value: information.Valor,
        description: information.Descrição,
        currency: information.Moeda,
        method: information.Pagamento,
        tag: information.Categoria,
        exchangeRates: action.Cambio,
      }],
      total: Number(total2),
    };
  }
  case 'DELETA_DESPESAS': {
    const numSub = Number(state.total - Number(action.valorDespesaDeletada)).toFixed(2);
    return {
      ...state,
      expenses: action.despesasFiltradas,
      total: Number(numSub <= 0 ? 0 : numSub),
    };
  }
  default:
    return state;
  }
};

export default wallet;
