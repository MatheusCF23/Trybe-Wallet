import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail } from '../redux/actions';

const OBJ = {
  name: '',
  email: '',
  password: '',
  disabled: true,
};

class Login extends React.Component {
  state = { ...OBJ };

  validation = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const number = 6;
    const PASSWORD = password.length >= number;
    const EMAIL = regex.test(email);
    const validate = EMAIL && PASSWORD;
    this.setState({ disabled: !validate });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.validation());
  };

  handleButton = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(getEmail(email));
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
          placeholder="email"
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          name="password"
          placeholder="password"
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
