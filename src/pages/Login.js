import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../actions';

const MIN_LENGTH = 6;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isBtnDisabled: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.inputValidation());
  };

  inputValidation = () => {
    const { email, password } = this.state;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = validEmail.test(email);
    const minPasswordLength = password.length >= MIN_LENGTH;
    const validInput = isValidEmail && minPasswordLength;
    this.setState({
      isBtnDisabled: !validInput,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isBtnDisabled } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="Email"
            value={ email }
            onChange={ this.handleChange }
            required
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Senha"
            value={ password }
            onChange={ this.handleChange }
            required
            minLength="6"
          />
          <button
            type="submit"
            disabled={ isBtnDisabled }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  login: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
