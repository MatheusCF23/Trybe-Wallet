import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getEmail } from '../redux/actions';

const stateObj = {
  name: '',
  email: '',
  password: '',
  disabled: true,
};

class Login extends React.Component {
  state = { ...stateObj };

  handleButton = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(getEmail(email));
    history.push('/carteira');
  };

  buttonValid = () => {
    const { email, password } = this.state;
    const number = 6;
    const cod = /\S+@\S+\.\S+/;
    const emailCheck = cod.test(email);
    const passwordCheck = password.length >= number;
    const validate = emailCheck && passwordCheck;
    this.setState({ disabled: !validate });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.buttonValid());
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
