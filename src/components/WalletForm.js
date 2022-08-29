import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAwesomeApi, apiInformationAndCambio } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      Valor: 0,
      Descrição: '',
      Moeda: 'USD',
      Pagamento: 'Dinheiro',
      Categoria: 'Alimentação',
      information: [],
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchAwesomeApi());
  }

  handleSetState = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSaveInformation = async () => {
    const { Valor, Descrição, Moeda, Pagamento, Categoria, information } = this.state;
    await this.setState((state) => (
      {
        information: [
          ...state.information,
          { id: information.length, Valor, Descrição, Moeda, Pagamento, Categoria }],
      }
    ));
    this.setState({
      Valor: '',
      Descrição: '',
      Moeda: 'USD',
      Pagamento: 'Dinheiro',
      Categoria: 'Alimentação',
    });
    this.handleDispatch();
  };

  handleDispatch = async () => {
    const { information } = this.state;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const novoArray = information[information.length - 1];
    const data = await response.json();
    const { dispatch, Wallet } = this.props;
    const array = {
      id: Wallet.expenses.length,
      value: novoArray.Valor,
      description: novoArray.Descrição,
      currency: novoArray.Moeda,
      method: novoArray.Pagamento,
      tag: novoArray.Categoria,
      exchangeRates: data,
    };
    dispatch(apiInformationAndCambio(array, data));
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
            Adicionar despesa

          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  Wallet: PropTypes.objectOf(PropTypes.arrayOf).isRequired,

};

const mapStateToProps = (state) => ({
  Wallet: state.wallet });

export default connect(mapStateToProps, null)(WalletForm);
