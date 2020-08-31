import React, { Component } from "react";
import FavoriteItem from "./FavoriteItem";
import { getUserFavorites, clearFromCart, removeFavorite } from './../../api/Api';
import {ID_USER} from './../constants/constants.js';
import Navbar from './../navbar/Navbar.jsx';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginNavbar from './../navbar/loginNavbar.jsx';

class Favoriteslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentWillMount() {
    this.props.getUserFavorites();
    this.setState({
      products: this.props.favoriteIdea
    });
  }
  removeFromCart = (product) => {
    const cart = {
      user: { _id: ID_USER },
      favorite: { _id: product._id },
    };
    let prod = this.state.products.filter((item) => item._id !== product._id);
    removeFavorite(cart).then();
    this.setState({ products: prod });
  };

  render() {
    const { products } = this.state;
    return (
      <div>
      {
        localStorage.getItem('JWT-TOKEN') == null ? <LoginNavbar/> : <Navbar/>
      }
      {
        localStorage.getItem('JWT-TOKEN') == null ? '' :
        <div className = "favoritebody">
          <h3 className="card-title">&nbsp;&nbsp;&nbsp;&nbsp;Favorites</h3>
          <hr />
          {products.map((product, index) => (
            <FavoriteItem
              product={product}
              key={index}
              remove={this.removeFromCart}
            />
          ))}
          <hr />
          {!products.length ? (
            <div style={{ display: "flex" }}>
              <h3 className="text-warning">No Favorites</h3>
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

function mapStateToProps(state) {
  console.log("State",state);
    return {
       favoriteIdea : state.FeedReducer.favoriteIdea,
       filteredFavoriteIdea : state.FeedReducer.filteredFavoriteIdea
    };
}

function matchDispatchToProps(dispatch){
  console.log("Dispatch",dispatch);
  return bindActionCreators({getUserFavorites: getUserFavorites}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Favoriteslist);
