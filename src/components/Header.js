import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { Email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{Email}</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  Email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  Email: state.user.email,
});

export default connect(mapStateToProps, null)(Header);
