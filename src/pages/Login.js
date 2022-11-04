import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Email } from '../redux/actions';

const stateObj = {
  name: '',
  email: '',
  password: '',
  disabled: true,
};

class Login extends React.Component {
  state = { ...stateObj };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.validateButton());
  };

  validateButton = () => {
    const { email, password } = this.state;
    const SIX = 6;
    const regex = /\S+@\S+\.\S+/;
    const checkEmail = regex.test(email);
    const checkPassword = password.length >= SIX;
    const validate = checkEmail && checkPassword;
    this.setState({ disabled: !validate });
  };

  handleButton = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(Email(email));
    history.push('/carteira');
  };

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          onChange={ this.handleChange }
        />
        <input
          data-testid="email-input"
          type="text"
          name="email"
          placeholder="Email"
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="Senha"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.handleButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
