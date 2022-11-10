import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getApi, API, convertedValue } from '../redux/actions';

const OBJ = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

class WalletForm extends Component {
  state = { ...OBJ };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getApi());
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  clickOn = async () => {
    const { dispatch } = this.props;
    const { currency, exchangeRates, value } = this.state;
    const cotation = exchangeRates[currency].ask;
    const convertion = value * cotation;
    dispatch(convertedValue(convertion));
    dispatch(API(this.state));
    this.setState((prev) => ({ id: prev.id + 1, value: '', description: '' }));
  };

  expenses = async () => {
    const RESPONSE = await fetch('https://economia.awesomeapi.com.br/json/all');
    const DATA = await RESPONSE.json();
    delete DATA.USDT;
    this.setState({ exchangeRates: DATA }, this.clickOn);
  };

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <input
          type="number"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleChange }
          id=""
        >
          {currencies
            .map((element) => (
              <option
                name="currency"
                value={ element }
                key={ element }
              >
                {element}
              </option>
            ))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          onChange={ this.handleChange }
          id=""
        >
          <option name="method" value="Dinheiro">Dinheiro</option>
          <option name="method" value="Cartão de crédito">Cartão de crédito</option>
          <option name="method" value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ this.handleChange }
          id=""
        >
          <option name="tag" value="Alimentação">Alimentação</option>
          <option name="tag" value="Lazer">Lazer</option>
          <option name="tag" value="Trabalho">Trabalho</option>
          <option name="tag" value="Transporte">Transporte</option>
          <option name="tag" value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.expenses }
        >
          Adicionar despesa

        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenseCurrency: state.wallet.expences,
});

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
