const ESTADO_INICIAL = {
  currencies: [],
  expenses: [],
  total: '0.00',
  editor: false,
  idToEdit: 0,
  buttonEdit: false,
};

const API_CAMBIO = 'API_CAMBIO';

const wallet = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
  case 'API_DATA': {
    return {
      ...state,
      currencies: [...Object.keys(action.data)].filter((e) => e !== 'USDT'),
    };
  }
  case API_CAMBIO: {
    const arrayCambio = Object.entries(action.Cambio);
    const arrayFilterMoedaCambio = arrayCambio.filter((e) => (
      e[0] === action.Information.currency
    ));
    const cotacaoAtualDaMoeda = arrayFilterMoedaCambio[0][1].ask;
    const
      t = Number(Number(state.total)
      + cotacaoAtualDaMoeda * action.Information.value).toFixed(2);
    return {
      ...state,
      expenses: [...state.expenses, action.Information],
      total: Number(t),
    };
  }
  case 'DELETA_DESPESAS': {
    const numSub = Number(state.total - Number(action.valorDespesaDeletada)).toFixed(2);
    return {
      ...state,
      expenses: action.despesasFiltradas,
      total: Number(Number(numSub <= 0 ? 0 : numSub).toFixed(2)) <= 0
        ? '0.00' : Number(Number(numSub <= 0 ? 0 : numSub).toFixed(2)),
    };
  }
  case 'SAVE_DESPESAS': {
    const total = state.total - (Number(action.A)) + Number(action.valorCam);
    return {
      ...state,
      expenses: action.expenses,
      total: total.toFixed(2) <= 0 ? '0.00' : total.toFixed(2),
      buttonEdit: false,
    };
  }
  case 'EDITAR_DESPESAS':
    return {
      ...state,
      buttonEdit: true,
      DespesaParaEditar: [...action.despesa],
      IndexDaDespesa: [action.index, action.valorCambio],
    };
  default:
    return state;
  }
};

export default wallet;
