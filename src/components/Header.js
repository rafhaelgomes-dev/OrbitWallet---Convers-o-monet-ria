import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import Logo from '../assets/logo.svg';
import Moedas from '../assets/Moedas.svg';

class Header extends Component {
  render() {
    const { Email, Wallet } = this.props;
    const { total } = Wallet;
    return (
      <div className={ styles.containerHeader }>
        <img src={ Logo } alt="logo" />
        <section className={ styles.containerTotal }>
          <img src={ Moedas } alt="logo moeda" />
          <p className={ styles.pTotal }>{`Total de despesas: ${total}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </section>
        <p data-testid="email-field">{`${Email}`}</p>
      </div>
    );
  }
}

Header.propTypes = {
  Email: PropTypes.string.isRequired,
  Wallet: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  Email: state.user.email,
  Wallet: state.wallet,
});

export default connect(mapStateToProps, null)(Header);
