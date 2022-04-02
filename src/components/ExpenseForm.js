import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, saveExpense, editedExpense } from '../actions';

class ExpenseForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      currency: '',
      method: '',
      tag: '',
      description: '',
    };
  }

  componentDidUpdate(prev) {
    const { isEditing } = this.props;
    if (prev.isEditing !== isEditing) {
      this.setStateToEditExpense();
    }
  }

  setStateToEditExpense = () => {
    const { toBeEdited } = this.props;
    this.setState({ ...toBeEdited });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  initialState = () => {
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      currency: '',
      method: '',
      tag: '',
      description: '',
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { getExchange, addExpense, exchangeRates } = this.props;
    getExchange();
    const expense = { ...this.state, exchangeRates };
    addExpense(expense);
    this.initialState();
  }

  handleEdit = (e) => {
    e.preventDefault();
    const { editedExchange } = this.props;
    editedExchange(this.state);
    this.initialState();
  }

  render() {
    const { isLoading, currencies, error, isEditing } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <div>
        { isLoading && <p>Loading...</p> }
        <form onSubmit={ isEditing ? this.handleEdit : this.handleSubmit }>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              id="value"
              name="value"
              placeholder="Amount"
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
              data-testid="currency-input"
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
              placeholder="Insert a short description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            disabled={ !(value > 0 && currency && method && tag && description) }
          >
            {isEditing ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </form>
        {error && <p>{ error }</p>}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(saveExpense(expense)),
  getExchange: () => dispatch(fetchCurrencies()),
  editedExchange: (state) => dispatch(editedExpense(state)),
});

const mapStateToProps = ({
  wallet: { isLoading, currencies, error, exchangeRates, isEditing, toBeEdited } }) => ({
  isLoading,
  currencies,
  error,
  exchangeRates,
  isEditing,
  toBeEdited,
});

ExpenseForm.propTypes = {
  isLoading: PropTypes.bool,
  currencies: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.string,
  exchangeRates: PropTypes.objectOf(PropTypes.object),
  isEditing: PropTypes.bool,
  toBeEdited: PropTypes.objectOf(
    PropTypes.string,
    PropTypes.number,
  ),
  addExpense: PropTypes.func,
  getExchange: PropTypes.func,
  editedExpense: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
