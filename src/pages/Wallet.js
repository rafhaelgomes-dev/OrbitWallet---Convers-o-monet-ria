import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import WalletFormEdit from '../components/WalletFormEdit';
import styles from './Wallet.module.css';

class Wallet extends React.Component {
  render() {
    const { WalletState } = this.props;
    const { buttonEdit } = WalletState;
    return (
      <div className={ styles.containerWallet }>
        <div className={ styles.cabeçalho }>
          <h1>OrbitWallet</h1>
          <p>Plataforma de conversão monetária</p>
        </div>
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
