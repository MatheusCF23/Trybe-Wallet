import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, convertedValue } = this.props;

    return (
      <div>
        <h1 data-testid="email-field">
          { email }
        </h1>
        <h2 data-testid="total-field">
          { convertedValue < 0 ? '0.00' : convertedValue.toFixed(2) }
        </h2>
        <h3 data-testid="header-currency-field">
          BRL
        </h3>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  convertedValue: state.wallet.convertedValue,
});

Header.propTypes = {
  convertedValue: PropTypes.shape({
    toFixed: PropTypes.func,
  }),
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
