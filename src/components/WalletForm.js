import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getApi, expensesApi, convertedValue } from '../redux/actions';

const stateObj = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchange: {},
};

class WalletForm extends Component {
  state = { ...stateObj };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getApi());
  }

  handleClick = async () => {
    const { dispatch } = this.props;
    const { currency, exchange, value } = this.state;
    const cotation = exchange[currency].ask;
    const convertion = value * cotation;
    dispatch(convertedValue(convertion));
    dispatch(expensesApi(this.state));
    this.setState((prev) => ({ id: prev.id + 1, description: '', value: '' }));
  };

  getExpenses = async () => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await request.json();
    delete data.USDT;
    this.setState({ exchange: data }, this.handleClick);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
          onChange={ this.handleChange }
          id=""
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.getExpenses }
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
