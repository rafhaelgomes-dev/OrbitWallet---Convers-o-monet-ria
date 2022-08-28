import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletaDespesas } from '../redux/actions';

class Table extends Component {
  handleDelete = (id, valorDespesaAnterior, valorCambio) => {
    const { Wallet, dispatch } = this.props;
    const { expenses } = Wallet;
    const expensesFilter = expenses.filter((e) => e.id !== id);
    const valorConvertido = Number(valorDespesaAnterior) * Number(valorCambio);
    dispatch(deletaDespesas(expensesFilter, valorConvertido));
  };

  render() {
    const { Wallet } = this.props;
    const { expenses } = Wallet;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={ e.id }>
              <td>{e.description}</td>
              <td>{e.tag}</td>
              <td>{e.method}</td>
              <td>{Number(e.value).toFixed(2)}</td>
              <td>{e.exchangeRates[e.currency].name}</td>
              <td>{Number(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
              <td>{(e.exchangeRates[e.currency].ask * e.value).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.handleDelete(
                    e.id,
                    e.value,
                    e.exchangeRates[e.currency].ask,
                  ) }
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  Wallet: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Wallet: state.wallet,
});

export default connect(mapStateToProps, null)(Table);
