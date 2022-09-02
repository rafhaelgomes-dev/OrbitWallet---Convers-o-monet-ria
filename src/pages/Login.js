import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import loginUserAction from '../redux/actions';
import styles from './Login.module.css';
import IMG from '../assets/img.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      validationEmail: false,
      validationPassword: false,
      disabled: true,
      redirect: false,
      email: '',
      error: undefined,
    };
  }

  handleRedirect = () => {
    const { dispatch } = this.props;
    const { email, disabled } = this.state;
    if (disabled === true) {
      this.setState({
        error: 'E-mail ou senha inválidos',
      });
      return;
    }
    dispatch(loginUserAction(email));
    this.setState({
      redirect: true,
    });
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
    const { redirect, email, error } = this.state;
    return (
      <section className={ styles.login }>
        <section className={ styles.containerPrincipal }>
          <section className={ styles.containerForm }>
            <form className={ styles.form }>
              <p className={ styles.pBemVindo }>👋 Seja bem-vindo</p>
              <h1>Você está na OrbitWallet</h1>
              <p
                className={ styles.pApresentação }
              >
                Somos uma super plataforma de conversão monetária

              </p>
              <p className={ styles.pEmail }>Email</p>
              <input
                data-testid="email-input"
                type="email"
                name="email"
                placeholder="Digite seu E-mail"
                value={ email }
                onChange={ (e) => this.handlePasswordaEmailValidation(e) }
                required
              />
              <p className={ styles.pSenha }>Senha</p>
              <input
                data-testid="password-input"
                type="password"
                name="password"
                placeholder="Digite uma senha de no mínimo 6 caracteres"
                onChange={ (e) => this.handlePasswordaEmailValidation(e) }
                required
              />
              {error !== undefined && <p className={ styles.pError }>{error}</p>}
              <button
                type="button"
                onClick={ this.handleRedirect }
              >
                Entrar

              </button>
            </form>
          </section>
          <section className={ styles.containerImagem }>
            <img src={ IMG } alt="imagem" />
          </section>
        </section>
        {redirect ? <Redirect to="/carteira" /> : null}
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Login);
