import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAwesomeApi, saveEditDespesas } from '../redux/actions';

class WalletFormEdit extends Component {
  constructor() {
    super();
    this.state = {
      Valor: 0,
      Descrição: '',
      Moeda: 'USD',
      Pagamento: 'Dinheiro',
      Categoria: 'Alimentação',
    };
  }

  async componentDidMount() {
    const { dispatch, Wallet } = this.props;
    const { DespesaParaEditar } = Wallet;
    await dispatch(fetchAwesomeApi());
    await this.setState({
      Valor: DespesaParaEditar[0].value,
      Descrição: DespesaParaEditar[0].description,
      Moeda: DespesaParaEditar[0].currency,
      Pagamento: DespesaParaEditar[0].method,
      Categoria: DespesaParaEditar[0].tag,
    });
  }

  handleSetState = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSaveInformation = async () => {
    const { Wallet, dispatch } = this.props;
    const { expenses } = Wallet;
    const { Valor, Descrição, Moeda, Pagamento, Categoria } = this.state;
    const exchangeRatesEdit = expenses[0].exchangeRates;
    const newDespesa = {
      id: Wallet.IndexDaDespesa[0],
      value: Valor,
      description: Descrição,
      currency: Moeda,
      method: Pagamento,
      tag: Categoria,
      exchangeRates: exchangeRatesEdit,
    };
    const state = Moeda;
    const valorAnterior = (
      Number(expenses[Wallet.IndexDaDespesa[0]].value)
      * Number(Wallet.IndexDaDespesa[1]));
    const newArray = [...expenses];
    const valorConvertido = Valor * Wallet.DespesaParaEditar[0].exchangeRates[state].ask;
    newArray.splice(Wallet.IndexDaDespesa[0], 1, newDespesa);
    dispatch(saveEditDespesas(newArray, valorConvertido, valorAnterior.toFixed(2)));
    this.setState({
      Valor: 0,
      Descrição: '',
      Moeda: 'USD',
      Pagamento: 'Dinheiro',
      Categoria: 'Alimentação',
    });
  };

  render() {
    const { Wallet } = this.props;
    const { currencies } = Wallet;
    const { Valor, Descrição, Moeda, Pagamento, Categoria } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="valor">
            Valor:
            <input
              type="text"
              value={ Valor }
              name="Valor"
              data-testid="value-input"
              onChange={ (e) => this.handleSetState(e) }
            />
          </label>
          <label htmlFor="descrição">
            Descrição:
            <input
              type="text"
              name="Descrição"
              value={ Descrição }
              data-testid="description-input"
              onChange={ (e) => this.handleSetState(e) }
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select
              name="Moeda"
              data-testid="currency-input"
              value={ Moeda }
              onChange={ (e) => this.handleSetState(e) }
            >
              {currencies.length === 0 ? null : (
                currencies.map((e) => (
                  <option key={ e }>{e}</option>
                ))
              )}
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de pagamento:
            <select
              name="Pagamento"
              data-testid="method-input"
              value={ Pagamento }
              onChange={ (e) => this.handleSetState(e) }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              name="Categoria"
              data-testid="tag-input"
              value={ Categoria }
              onChange={ (e) => this.handleSetState(e) }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleSaveInformation }
          >
            Editar despesa

          </button>
        </form>
      </div>
    );
  }
}

WalletFormEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  Wallet: PropTypes.objectOf(PropTypes.arrayOf).isRequired,

};

const mapStateToProps = (state) => ({
  Wallet: state.wallet,
  EditarDespesa: state.editarDespesas,
});

export default connect(mapStateToProps, null)(WalletFormEdit);
