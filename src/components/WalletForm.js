import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAwesomeApi } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      Valor: '',
      Descrição: '',
      Moeda: 'USD',
      Pagamento: 'Dinheiro',
      Categoria: 'Alimentação',
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
