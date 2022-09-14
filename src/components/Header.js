import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import Logo from '../assets/logo.svg';
import Moedas from '../assets/Moedas.svg';
import IconEmail from '../assets/iconEmail.svg';

class Header extends Component {
  render() {
    const { Email, Wallet } = this.props;
    const { total } = Wallet;
    return (
      <div className={ styles.containerHeader }>
        <div className={ styles.logoContainer }>
          <img src={ Logo } alt="logo" />
          <p>Orbit Wallet</p>
        </div>
        <section className={ styles.containerTotal }>
          <img src={ Moedas } alt="logo moeda" />
          <p className={ styles.pTotal }>{`Total de despesas: ${total}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </section>
        <section className={ styles.logoContainerEmail }>
          <img src={ IconEmail } alt="logo" />
          <p>{`${Email}`}</p>
        </section>
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
