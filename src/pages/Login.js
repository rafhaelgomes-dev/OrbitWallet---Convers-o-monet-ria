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
      email: '',
    };
  }

  handleRedirect = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(loginUserAction(email));
    history.push('/carteira');
  };

  handlePasswordaEmailValidation = (event) => {
    const { target } = event;
    const { value, name } = target;
    const { validationEmail, validationPassword } = this.state;
    const number = 4;
    if (name === 'email') {
      const regex = /\S+@\S+\.\S+/;
      this.setState({
        validationEmail: regex.test(event.target.value),
        email: event.target.value,
      });
    }
    if (name === 'password') {
      if (value.length > number) {
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
    const { redirect, disabled, email } = this.state;
    return (
      <section>
        <form>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
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
          <button
            type="button"
            disabled={ disabled }
            onClick={ this.handleRedirect }
          >
            Entrar

          </button>
        </form>
        {redirect ? <Redirect to="/carteira" /> : null}
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Login);
