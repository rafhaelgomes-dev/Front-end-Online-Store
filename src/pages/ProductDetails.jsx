import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductID } from '../services/api';
import Comment from '../components/Comment';
import QuantOfProductsCart from '../components/QuantOfProductsCart';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      listProducts: [],
      redirect: false,
      evaluationValues: ['1', '2', '3', '4', '5'],
      rating: 0,
      email: '',
      message: '',
      errorMsg: '',
      listComments: [],
      paginaInicial: false,
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    this.getCommentsLocalStorage(id);
    const fetchApi = await getProductID(id);
    this.setState({ listProducts: fetchApi, id });
  }

  handleClickBtnEvaluation = ({ target: { value } }) => {
    this.setState({ rating: Number(value) });
  }

  handleChangeForm = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  getCommentsLocalStorage = (id) => {
    const commnents = localStorage.getItem([id]);
    this.setState({ listComments: JSON.parse(commnents) || [] });
  }

  setCommentsLocalStorage = () => {
    const { listComments, id } = this.state;
    localStorage.setItem([id], JSON.stringify(listComments));
  }

  handleClickForm = (e) => {
    e.preventDefault();
    const isFormFieldValid = this.validationForm();
    if (isFormFieldValid) {
      const { rating, email, message } = this.state;
      const comment = {
        rating,
        email,
        message,
      };
      this.setState((prevState) => ({
        listComments: [...prevState.listComments, comment],
        rating: 0,
        email: '',
        message: '',
        errorMsg: '',
      }), this.setCommentsLocalStorage);
    } else {
      this.setState({ errorMsg: 'Campos inválidos' });
    }
  }

  validationForm = () => {
    const { rating, email } = this.state;
    const mailFormat = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
    const isValidEmail = mailFormat.test(email);
    const isValidRating = rating !== 0;
    return isValidEmail && isValidRating;
  }

  redirectPaginaInicial = () => {
    this.setState({
      paginaInicial: true,
    });
  }

  redirectShoppingCart() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    /*  const { match: { params: { id } } } = this.props; */
    const {
      listProducts,
      redirect,
      evaluationValues,
      email,
      message,
      errorMsg,
      listComments,
      paginaInicial,
    } = this.state;
    const { getPropsOfChildrens, listItemsAdd, quantidade2 } = this.props;

    return (
      <div>
        <header className="header">
          <h3>Front-end Online Store</h3>
          <div className="FormPesquisa" />
          <div className="botoesHeader">
            <button
              className="buttonCarrinho"
              data-testid="shopping-cart-button"
              type="button"
              onClick={ () => this.redirectPaginaInicial() }
            >
              Página Inicial
            </button>
            <button
              className="buttonCarrinho"
              data-testid="shopping-cart-button"
              type="button"
              onClick={ () => this.redirectShoppingCart() }
            >
              Carrinho de compras
              <QuantOfProductsCart
                data-testid="shopping-cart-size"
                quantidade2={ quantidade2 }
                quantidade={ listItemsAdd }
              />
            </button>
          </div>
          {paginaInicial ? <Redirect to="/" /> : null}
        </header>
        <div className="product-detail-link">
          <p data-testid="product-detail-name">{listProducts.title}</p>
          <img data-testid="product-detail-image" src={ listProducts.thumbnail } alt="" />
          <p data-testid="product-detail-price">{`R$ ${listProducts.price}`}</p>
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ () => getPropsOfChildrens(listProducts) }
          >
            Adicionar produto ao Carrinho de compras
          </button>
          {redirect ? <Redirect to="/shoppingcart" /> : null}

          <div>
            <form>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                data-testid="product-detail-email"
                onChange={ (e) => this.handleChangeForm(e) }
                value={ email }
                required
              />
              <div>
                {evaluationValues.map((value) => (
                  <button
                    key={ value }
                    type="button"
                    onClick={ (e) => this.handleClickBtnEvaluation(e) }
                    data-testid={ `${value}-rating` }
                    value={ value }
                  >
                    {value}
                  </button>))}

              </div>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                placeholder="Mensagem (Opcional"
                data-testid="product-detail-evaluation"
                onChange={ (e) => this.handleChangeForm(e) }
                value={ message }
              />
              <button
                type="submit"
                data-testid="submit-review-btn"
                onClick={ (e) => this.handleClickForm(e) }
              >
                Enviar
              </button>
            </form>
            {errorMsg && <p data-testid="error-msg">{errorMsg}</p> }
          </div>
          {listComments.map((comment, index) => (
            <Comment
              key={ comment.email + index }
              email={ comment.email }
              message={ comment.message }
              rating={ comment.rating }
            />
          ))}
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getPropsOfChildrens: PropTypes.func.isRequired,
  listItemsAdd: PropTypes.arrayOf.isRequired,
  quantidade2: PropTypes.arrayOf.isRequired,
};

export default ProductDetails;
