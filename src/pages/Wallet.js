import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, ExpenseForm, ExpenseTable } from '../components';
import { fetchCurrencies } from '../actions';

class Wallet extends Component {
  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <Header />
        <ExpenseForm />
        {expenses.length ? <ExpenseTable /> : (
          <span>Oh, parece que você não tem nenhuma despesa!</span>
        )}

      </div>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  currencies: PropTypes.func,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
