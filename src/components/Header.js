import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

class Header extends Component {
  render() {
    const { Email, Wallet } = this.props;
    const { total } = Wallet;
    return (
      <div className={ styles.containerHeader }>
        <p data-testid="email-field">{Email}</p>
        <section className={ styles.containerTotal }>
          <p data-testid="total-field" className={ styles.pTotal }>{total}</p>
          <p data-testid="header-currency-field">BRL</p>
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
