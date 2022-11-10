import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteItem, changeValue } from '../redux/actions';

class Newtable extends Component {
  handleDeleteBtn = () => {
    const { expenses, dispatch } = this.props;
    const { currency, exchangeRates, value } = expenses;
    const cotation = exchangeRates[currency].ask;
    const converted = value * cotation;
    dispatch(deleteItem(expenses));
    dispatch(changeValue(converted));
  };

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
        <td>
          <button
            data-testid="delete-btn"
            type="button"
            onClick={ this.handleDeleteBtn }
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => ({
  convertedValue: state.wallet.convertedValue,
});

Newtable.propTypes = {

}.isRequired;

export default connect(mapStateToProps)(Newtable);
