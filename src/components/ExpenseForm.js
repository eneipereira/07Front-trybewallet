import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExchange, saveExpense } from '../actions';

class ExpenseForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '0',
      currency: '',
      method: '',
      tag: '',
      description: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { getExchange } = this.props;
    await getExchange();
    const { addExpense, exchangeRates } = this.props;
    const { id, value, currency, method, tag, description } = this.state;
    const expense = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };
    addExpense(expense);
    this.setState({
      id: id + 1,
      value: '0',
      currency: '',
      method: '',
      tag: '',
      description: '',
    });
  }

  render() {
    const { isLoading, currencies, error } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <div>
        { isLoading && <p>Loading...</p> }
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              id="value"
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              <option value="" disabled hidden>Selecione</option>
              { currencies.map((curr) => (
                <option key={ curr } value={ curr }>{curr}</option>
              )) }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              name="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="" disabled hidden>Selecione</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              id="tag"
              name="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="" disabled hidden>Selecione</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label
            htmlFor="description"
          >
            Descrição:
            <input
              type="text"
              id="description"
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            disabled={ !(value > 0 && currency && method && tag && description) }
          >
            Adicionar despesa

          </button>
        </form>
        {error && <p>{ error }</p>}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(saveExpense(expense)),
  getExchange: () => dispatch(fetchExchange()),
});

const mapStateToProps = ({
  wallet: { isLoading, currencies, error, exchangeRates } }) => ({
  isLoading,
  currencies,
  error,
  exchangeRates,
});

ExpenseForm.propTypes = {
  isLoading: PropTypes.bool,
  currencies: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.string,
  exchangeRates: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
