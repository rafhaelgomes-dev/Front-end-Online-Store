import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      listProduct: [],
      fullName: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      payment: '',
      redirect: false,
      errorMsg: '',
    };
  }

  componentDidMount() {
    this.getProdutcsLocalStorage();
  }

  handleChangeForm = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  validationForm = () => {
    const {
      fullName,
      email,
      cpf,
      phone,
      cep,
      address,
      payment,
    } = this.state;
    const fieldForms = [
      fullName,
      email,
      cpf,
      phone,
      cep,
      address,
      payment,
    ];
    const isValidFieldForm = fieldForms.every((field) => field !== '');
    return isValidFieldForm;
  }

  handleClickBtnForm = (e) => {
    e.preventDefault();
    if (this.validationForm()) {
      localStorage.removeItem('db_shoppingcart');
      this.setState({ redirect: true, errorMsg: '' });
    } else {
      this.setState({ errorMsg: 'Campos inválidos' });
    }
  }

  getProdutcsLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem('db_shoppingcart'));
    this.setState({ listProduct: products });
  }

  render() {
    const {
      listProduct,
      fullName,
      email,
      cpf,
      phone,
      cep,
      address,
      redirect,
      errorMsg,
    } = this.state;
    return (
      <div>
        {listProduct.map(({ title }, index) => <p key={ index }>{title}</p>)}
        <fieldset>
          <form>
            <label htmlFor="fullName">
              Nome Completo:
              <input
                type="text"
                name="fullName"
                id="fullName"
                data-testid="checkout-fullname"
                value={ fullName }
                onChange={ this.handleChangeForm }
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                id="email"
                data-testid="checkout-email"
                value={ email }
                onChange={ this.handleChangeForm }

              />
            </label>
            <label htmlFor="cpf">
              CPF
              <input
                type="text"
                name="cpf"
                id="cpf"
                data-testid="checkout-cpf"
                placeholder="Ex.: 000.000.000-00"
                value={ cpf }
                onChange={ this.handleChangeForm }

              />
            </label>
            <label htmlFor="phone">
              Telefone
              <input
                type="text"
                name="phone"
                id="phone"
                data-testid="checkout-phone"
                placeholder="Ex.: (00) 00000-0000"
                value={ phone }
                onChange={ this.handleChangeForm }
              />
            </label>

            <label htmlFor="cep">
              CEP
              <input
                type="text"
                name="cep"
                id="cep"
                data-testid="checkout-cep"
                placeholder="Ex.: 00000-000"
                value={ cep }
                onChange={ this.handleChangeForm }
              />
            </label>

            <label htmlFor="address">
              Endereço
              <input
                type="text"
                name="address"
                id="address"
                data-testid="checkout-address"
                value={ address }
                onChange={ this.handleChangeForm }
              />
            </label>

            <label htmlFor="boleto">
              <input
                type="radio"
                name="payment"
                id="boleto"
                value="boleto"
                data-testid="ticket-payment"
                onChange={ this.handleChangeForm }
              />
              Boleto
            </label>
            <label htmlFor="visa">
              <input
                type="radio"
                name="payment"
                id="visa"
                value="visa"
                data-testid="visa-payment"
                onChange={ this.handleChangeForm }
              />
              Visa
            </label>
            <label htmlFor="mastercard">
              <input
                type="radio"
                name="payment"
                id="mastercard"
                value="mastercard"
                data-testid="master-payment"
                onChange={ this.handleChangeForm }
              />
              MasterCard
            </label>
            <label htmlFor="elo">
              <input
                type="radio"
                name="payment"
                id="elo"
                value="elo"
                data-testid="elo-payment"
                onChange={ this.handleChangeForm }
              />
              Elo
            </label>

            <button
              type="submit"
              data-testid="checkout-btn"
              onClick={ (e) => this.handleClickBtnForm(e) }
            >
              Comprar
            </button>

          </form>
        </fieldset>
        {errorMsg && <p data-testid="error-msg">{errorMsg}</p>}
        {redirect && <Redirect to="/" />}
      </div>
    );
  }
}
