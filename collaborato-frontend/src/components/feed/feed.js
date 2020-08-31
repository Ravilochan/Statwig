import React, { Component } from 'react';
import './feed.css';
import Card from './card.js'
import HomeCard from './homecard.js';
import color from '@material-ui/core/colors/green';
import Navbar from './../navbar/Navbar.jsx';
import LoginNavbar from './../navbar/loginNavbar.jsx';
import { connect } from "react-redux";
import {history} from "../../util/utils";
import {bindActionCreators} from 'redux';
import {getFeed} from './../../api/Api';
import PopularPost from './popularPost.js';
import Pagination from "react-js-pagination";
import * as UTIL from "../../util/utils";
import {NotificationContainer, NotificationManager} from 'react-notifications';
class Feed extends Component {
    state = {  }
    constructor(){
      super();
      this.state={
        currentPage: 1,
        todosPerPage: 10,
        activePage: 15,
        imageID : ''
      };
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
      this.setState({
        currentPage : Number(event.target.id)
      });
      window.scrollTo(0, 0);
    }
    componentWillMount(){
      const data = "surabhisinha3108@gmail.com";
      console.log("value of data: ", data);
  		this.props.getFeed(data);
	   }
       handlePageChange(pageNumber) {
         console.log(`active page is ${pageNumber}`);
         this.setState({activePage: pageNumber});
      }
    render() {
      var random = -1;
      const { currentPage, todosPerPage } = this.state;
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = this.props.feedDetails.slice(indexOfFirstTodo, indexOfLastTodo);
      const TOTAL_COUNT=this.props.feedDetails.length;
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(this.props.feedDetails.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
        return (
          <li
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </li>
        );
      });
        return (
            <div>
            {
              localStorage.getItem('JWT-TOKEN') == null ? <LoginNavbar/> : <Navbar/>
            }
            {
                localStorage.getItem('JWT-TOKEN') == null ? '' :<div> <div className = "centralDiv">
                    <div style={{ 'margin-top':'40px'}}>
                    {
                      currentTodos != undefined ?
                      currentTodos.map((feed) => {
                        random = (random + 1) % 10;
                        return(<HomeCard feed={feed} random = {random}/>);
                      })  : ''
                    }
                    <br/>
                    </div>
                    <ul id="page-numbers1" className="pagination-style">
                                  {renderPageNumbers}
                    </ul>
                </div>
                <div className = "rightDiv">
                  <PopularPost/>
                </div></div>

            }
            </div>
         );
    }
}
const mapStateToProps = state => {
    return {
        feedDetails : state.FeedReducer.filteredfeedDetails,
     };
  };

function mapDispatchToProps(dispatch) {
      return bindActionCreators({ getFeed : getFeed}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
