import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { Email, Wallet } = this.props;
    const { total } = Wallet;
    return (
      <div>
        <p data-testid="email-field">{Email}</p>
        <p data-testid="total-field">{total}</p>
        <p data-testid="header-currency-field">BRL</p>
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
