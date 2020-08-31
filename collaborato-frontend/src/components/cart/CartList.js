import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { getProducts, clearFromCart, removeCartProduct } from './../../api/Api';
import {ID_USER} from './../constants/constants.js';
import Navbar from './../navbar/Navbar.jsx';
import LoginNavbar from './../navbar/loginNavbar.jsx';

export default class cartlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      total: 0,
    };
  }

  componentDidMount() {
    getProducts().then((item) => {
      let total = 0;
      for (var i = 0; i < item.length; i++) {
        total += item[i].price;
      }
      this.setState({ products: item, total });
    });
  }

  clearCart() {
    clearFromCart(ID_USER)
      .then()
      .catch((err) => {
        console.log(err);
      });
    this.setState({ products: [] });
  }
  removeFromCart = (product) => {
    const cart = {
      user: { _id: ID_USER },
      cart: { _id: product._id },
    };
    let prod = this.state.products.filter((item) => item._id !== product._id);
    console.log(prod);
    removeCartProduct(cart).then();
    this.setState({ products: prod });
  };

  render() {
    const { products, total } = this.state;
    return (
      <div>
      {
        localStorage.getItem('JWT-TOKEN') == null ? <LoginNavbar/> : <Navbar/>
      }
      {
        localStorage.getItem('JWT-TOKEN') == null ? '' : <div className = "favoritebody">
        <h3 className="card-title">&nbsp;&nbsp;&nbsp;&nbsp;Cart</h3>
        <hr />
        {products.map((product, index) => (
          <CartItem
            product={product}
            key={index}
            remove={this.removeFromCart}
          />
        ))}
        <hr />
        {products.length ? (
          <div>
            <h4>
              <small>&nbsp;&nbsp;&nbsp;&nbsp;Total Amount:</small>
              <span className="float-right text-primary">${total}</span>
            </h4>
            <hr />
          </div>
        ) : (
          ""
        )}
        <Link to="/checkout">
          <button className="btn btn-success float-right checkout">Checkout</button>
        </Link>
        <button
          className="btn btn-danger float-right clear"
          onClick={() => this.clearCart()}
          style={{ marginRight: "10px" }}
        >
          Clear Cart
        </button>
        {!products.length ? (
          <div style={{ display: "flex" }}>
            <h3 className="text-warning">&nbsp;&nbsp;&nbsp;&nbsp;No item on the cart</h3>
            <Link to="/feed">
              <button className="btn btn-warning ml-3 back">
                Back to List of Ideas
              </button>
            </Link>
          </div>
        ) : (
          ""
        )}

      </div>
      }


      </div>
    );
  }
}
