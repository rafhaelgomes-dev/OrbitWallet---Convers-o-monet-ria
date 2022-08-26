import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import loginUserAction from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      validationEmail: false,
      validationPassword: false,
      disabled: true,
      redirect: false,
    };
  }

  handleRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  handlePasswordaEmailValidation = (event) => {
    const { dispatch } = this.props;
    const { target } = event;
    const { value, name } = target;
    const { validationEmail, validationPassword } = this.state;
    const number = 6;
    if (name === 'email') {
      dispatch(loginUserAction(event.target.value));
      const regex = /\S+@\S+\.\S+/;
      this.setState({
        validationEmail: regex.test(event.target.value),
      });
    }
    if (name === 'password') {
      if (value.length >= number) {
        this.setState({ validationPassword: true });
      } else {
        this.setState({ validationPassword: false });
      }
    }
    const boolen = true;
    if (validationEmail === boolen && validationPassword && boolen) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  render() {
    const { redirect, disabled } = this.state;
    const { user } = this.props;
    return (
      <section>
        <form>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={ user.email }
            onChange={ (e) => this.handlePasswordaEmailValidation(e) }
            required
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            onChange={ (e) => this.handlePasswordaEmailValidation(e) }
            required
          />
          <input
            type="button"
            name="button"
            value="Entrar"
            disabled={ disabled }
            onClick={ this.handleRedirect }
          />
        </form>
        {redirect ? <Redirect to="/wallet" /> : null}
      </section>
    );
  }
}

Login.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Login);
