import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Header = ({ email, expenses, currency }) => {
  const total = expenses.reduce((acc, curr) => {
    acc += parseFloat(curr.value * curr.exchangeRates[curr.currency].ask);
    return acc;
  }, 0);
  return (
    <header>
      <h2>TrybeWallet</h2>
      <div>
        <span data-testid="email-field">
          <b>Email:</b>
          { email }
        </span>
        <span>
          <b>Despesa total:</b>
          R$
          <span data-testid="total-field">
            {total.toFixed(2)}
          </span>
          <span data-testid="header-currency-field">
            { currency }
          </span>
        </span>
      </div>
    </header>
  );
};

const mapStateToProps = ({ user: { email }, wallet: { expenses, currency } }) => ({
  email,
  expenses,
  currency,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      exchangeRates: PropTypes.objectOf(
        PropTypes.shape({
          ask: PropTypes.string,
        }),
      ),
    }),
  ),
  currency: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
