import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import WalletFormEdit from '../components/WalletFormEdit';

class Wallet extends React.Component {
  render() {
    const { WalletState } = this.props;
    const { buttonEdit } = WalletState;
    return (
      <div>
        <h1>Carteira</h1>
        <Header />
        {buttonEdit === true ? <WalletFormEdit /> : <WalletForm />}
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  WalletState: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
};

const mapStateToProps = (state) => ({
  WalletState: state.wallet,
});

export default connect(mapStateToProps, null)(Wallet);
