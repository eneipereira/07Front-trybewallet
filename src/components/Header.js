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
        <h4>Email:</h4>
        <p data-testid="email-field">{ email }</p>
      </div>
      <div>
        <h4>Despesa Total:</h4>
        <p data-testid="header-currency-field">
          R$
          {' '}
          <span data-testid="total-field">{ total.toFixed(2) }</span>
          {' '}
          { currency }
        </p>
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
