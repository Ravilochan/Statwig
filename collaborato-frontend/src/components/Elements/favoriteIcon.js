import React,{ Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from 'react-bootstrap'
import { Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {ideaFavorite, ideaUnfavorite,addFavorite,removeFavorite,getFavorites,getUserFavorites,getFavoritesList} from './../../api/Api';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {ID_USER} from './../constants/constants.js';

class FavoriteIcon extends Component {
  constructor(props) {
    super(props);
    const found = this.props.favoriteIdea.some(el => el._id === this.props.feed._id);
    this.state = {
      favoriteFlag : found,
      products : [],
      favorite : {},
      user : {
      },
    }
    this.handleClick = this.handleClick.bind(this);
    this.handlefavorite = this.handlefavorite.bind(this);
  }
  handleClick = e => {
    e.preventDefault();
    this.setState({
      favoriteFlag : true
    })
    this.state.favorite._id = this.props.feed._id;
    this.state.favorite.idea_owner = this.props.feed.idea_owner,
    this.state.favorite.idea_owner_name = this.props.feed.idea_owner_name,
    this.state.favorite.idea_field = this.props.feed.idea_field,
    this.state.favorite.idea_genre = this.props.feed.idea_genre,
    this.state.favorite.idea_headline = this.props.feed.idea_headline,
    this.state.favorite.idea_description = this.props.feed.idea_description,
    this.state.favorite.price = '200'
    this.state.user._id = localStorage.getItem('useremail');
    addFavorite(this.state);
    this.props.ideaFavorite(this.props.feed);
  }
  handlefavorite = e => {
    e.preventDefault();
    this.setState({
      favoriteFlag : false
    })
    this.state.favorite._id = this.props.feed._id;
    this.state.favorite.idea_owner = this.props.feed.idea_owner,
    this.state.favorite.idea_owner_name = this.props.feed.idea_owner_name,
    this.state.favorite.idea_genre = this.props.feed.idea_genre,
    this.state.favorite.idea_field = this.props.feed.idea_field,
    this.state.favorite.idea_headline = this.props.feed.idea_headline,
    this.state.favorite.idea_description = this.props.feed.idea_description,
    this.state.favorite.price = '200'
    this.state.user._id = localStorage.getItem('useremail');
    removeFavorite(this.state);
    this.props.ideaUnfavorite(this.props.feed);
  }

  componentWillMount() {
          this.props.getUserFavorites(this.props.feed._id);
          this.setState({
              favoriteFlag : this.props.favoriteIdea.some(el => el._id === this.props.feed._id)
          })
  }

  render() {
    const { products } = this.state;
    const flag = this.props.favoriteIdea.some(el => el._id === this.props.feed._id);
    return (
      <div>
      {
        flag ?
        <a onClick={this.handlefavorite} className = "favoritesvg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.397 17.899l1.019 6.101-7.416-4.554-7.416 4.554 1.48-8.866-6.064-5.828 8.332-1.15 3.668-8.156 3.047 6.773c-1.258 1.186-2.047 2.863-2.047 4.727 0 3.213 2.334 5.875 5.397 6.399zm1.103-10.899c-2.486 0-4.5 2.015-4.5 4.5s2.014 4.5 4.5 4.5c2.484 0 4.5-2.015 4.5-4.5s-2.016-4.5-4.5-4.5zm-.469 6.484l-1.688-1.637.695-.697.992.94 2.115-2.169.697.696-2.811 2.867z"/></svg>
        </a>: <a className = "favoritesvg"
        onClick={this.handleClick}
      >
        <svg
          width="33" height="33" viewBox="0 0 33 33"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.397 17.899l1.019 6.101-7.416-4.554-7.416 4.554 1.48-8.866-6.064-5.828 8.332-1.15 3.668-8.156 3.047 6.773c-.558.526-1.021 1.148-1.365 1.842l-1.682-3.739-2.298 5.109-5.342.738 3.851 3.7-.931 5.575 4.72-2.898 4.72 2.898-.481-2.882c.656.382 1.383.651 2.158.783zm5.603-6.399c0 2.485-2.018 4.5-4.5 4.5-2.484 0-4.5-2.015-4.5-4.5s2.016-4.5 4.5-4.5c2.482 0 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v1.999l-2 .001v1h2v2h1v-2h2v-1z"
            class="inactive-item"
            style={{ fill: "black" }}
          />
        </svg>
        <NotificationContainer/>
      </a>
      }


    </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("State",state);
    return {
       favoriteIdea : state.FeedReducer.favoriteIdea,
       filteredFavoriteIdea : state.FeedReducer.filteredFavoriteIdea,
       favoritedIdeaFlag : state.FeedReducer.favoritedIdeaFlag
    };
}

function matchDispatchToProps(dispatch){
  console.log("Dispatch",dispatch);
  return bindActionCreators({ideaFavorite : ideaFavorite, ideaUnfavorite : ideaUnfavorite, getFavoritesList : getFavoritesList, getUserFavorites: getUserFavorites}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(FavoriteIcon);
