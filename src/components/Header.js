import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, getConvertion } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          { email }
        </p>
        <p data-testid="total-field">
          {getConvertion.toFixed(2)}
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  getConvertion: state.wallet.getConvertion,
});

Header.propTypes = {
  getConvertion: PropTypes.shape({
    toFixed: PropTypes.func,
  }),
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
