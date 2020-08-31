import React, {Component} from 'react';
import {Switch,Route, Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import {history} from './../util/utils';
import store from './store/store.js';
import Navbar from "./navbar/Navbar";
import Search from "./Search";
import Feed from "./feed/feed.js";
import FeedDetail from "./feed/feedDetail.js";
import Detail from "./feed/detail.js";
import FavoriteCard from "./feed/favoriteCard.js"
import Favoriteslist from "./favorite/FavoritesList";
import Checkout from "./cart/Checkout";
import Cartlist from "./cart/CartList";
import onSuccess from "./cart/onSuccess";
import postIdea from "./ideaPost/IdeaPost"
import Dashboard from './dashboard/dashboard';
import UserProfile from "./users/userProfile.js"
import Login from "./users/login.js"
import SignUp from "./users/signup.js"
import Profiling from "./userprofiling/profiling"
import IdeaTrends from "./userprofiling/profiling"
import PreferenceTrends from "./userprofiling/preferencetrends"
import TopTrending from "./userprofiling/toptrends"
import NonUserProfile from "./users/nonUserProfile.js"
import Admin from './admin/admin.js'

class Main extends Component {
    render(){
        return(
            <Provider store={store}>
            <Router history={history}>
            <Switch>
                <Route exact path="/navbar" component={Navbar} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/feed" component={Feed} />
                <Route exact path="/detail" component={Detail} />
                <Route exact path="/favorites" component={Favoriteslist} />
                <Route exact path="/cart" component={Cartlist} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/onSuccess" component={onSuccess} />
                <Route exact path="/postidea" component={postIdea} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/profile" component={UserProfile} />
                <Route exact path="/trends" component={Profiling}/>
                <Route exact path="/user/details" component={NonUserProfile}/>
                <Route exact path="/admin" component={Admin}/>

                </Switch>
            </Router>
            </Provider>
    );
  }
}
export default Main;
