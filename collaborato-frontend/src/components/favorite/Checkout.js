import React from "react";
import { Link } from "react-router-dom";
import { getProducts } from './../../api/Api';
import LoginNavbar from './../navbar/loginNavbar.jsx';
export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      total: 0,
    };
  }

  componentWillMount() {
    getProducts().then((item) => {
      let total = 0;
      for (var i = 0; i < item.length; i++) {
        total += item[i].price;
      }
      this.setState({ products: item, total });
    });
  }

  render() {
    const { products, total } = this.state;
    return (
      <div>
      {
        localStorage.getItem('JWT-TOKEN') == null ? <LoginNavbar/> : <Navbar/>
      }
      {
        localStorage.getItem('JWT-TOKEN') == null ? '' : <div className = "container">
        <h3 className="card-title">Checkout</h3>
        <hr />
        {products.map((product, index) => (
          <div key={index}>
            <p>
              {product.idea_headline}
              <span className="float-right text-primary">${product.price}</span>
            </p>
            <hr />
          </div>
        ))}
        <hr />
        {products.length ? (
          <div>
            <h4>
              <small>Total Amount:</small>
              <span className="float-right text-primary">${total}</span>
            </h4>
            <hr />
          </div>
        ) : (
          ""
        )}
        {!products.length ? (
          <h3 className="text-warning">No item in the cart</h3>
        ) : (
          ""
        )}
        {products.length ? (
          <button
            className="btn btn-success float-right"
            onClick={() => alert("You have Successfully purchased ")}
          >
            Pay
          </button>
        ) : (
          ""
        )}
        <Link to="/">
          <button
            className="btn btn-danger float-right"
            style={{ marginRight: "10px" }}
          >
            Cancel
          </button>
        </Link>
        <br />
        <br />
        <br />
        </div>
      }

      </div>
    );
  }
}
