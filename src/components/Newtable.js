import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Newtable extends Component {
  render() {
    const { expenses } = this.props;
    const { currency } = expenses;
    const currencyAsk = expenses.exchangeRates[currency];
    const ask = +currencyAsk.ask;
    const convertion = expenses.value * currencyAsk.ask;
    const value = +expenses.value;
    return (
      <tr>
        <td>{expenses.description}</td>
        <td>{expenses.tag}</td>
        <td>{expenses.method}</td>
        <td>{value.toFixed(2)}</td>
        <td>{currencyAsk.name}</td>
        <td>{ask.toFixed(2)}</td>
        <td>{convertion.toFixed(2)}</td>
        <td>Real</td>
      </tr>
    );
  }
}

Newtable.propTypes = {
  expenses: PropTypes.shape({
    value: PropTypes.number,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.objectOf,
  }).isRequired,
};

export default Newtable;
