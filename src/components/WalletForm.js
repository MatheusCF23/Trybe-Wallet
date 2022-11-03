import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFetch, expensesApi, getConvertedValue } from '../redux/actions';

const OBJ = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  exchange: {},
};

class WalletForm extends Component {
  state = { ...OBJ };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getFetch());
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  click = async () => {
    const { dispatch } = this.props;
    const { currency, exchange, value } = this.state;
    const cotation = exchange[currency].ask;
    const convertation = value * cotation;
    dispatch(getConvertedValue(convertation));
    dispatch(expensesApi(this.state));
    this.setState((prev) => ({ id: prev.id + 1, description: '', value: '' }));
  };

  handleAPI = async () => {
    const RESPONSE = await fetch('https://economia.awesomeapi.com.br/json/all');
    const DATA = await RESPONSE.json();
    delete DATA.USDT;
    this.setState({ exchange: DATA }, this.click);
  };

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <input
          data-testid="value-input"
          name="value"
          type="number"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          data-testid="description-input"
          type="text"
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
          <option name="method" value="dinheiro">Dinheiro</option>
          <option name="method" value="cartãoDeCrédito">Cartão de crédito</option>
          <option name="method" value="cartãoDeDébito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ this.handleChange }
          id=""
        >
          <option name="tag" value="alimentacao">Alimentação</option>
          <option name="tag" value="lazer">Lazer</option>
          <option name="tag" value="trabalho">Trabalho</option>
          <option name="tag" value="transporte">Transporte</option>
          <option name="tag" value="saude">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.handleAPI }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenseCurrency: state.wallet.expences,
});

export default connect(mapStateToProps)(WalletForm);
