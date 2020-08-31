import React,{ Component } from 'react';
import Navbar from "../navbar/Navbar"
import HomeCard from "./homecard.js"
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";
import {getMyPosts} from './../../api/Api';
import LoginNavbar from './../navbar/loginNavbar.jsx';

class Dashboard extends Component{

    constructor(){
        super();
        this.state = {

        }
    }

    componentWillMount(){
        const data = localStorage.getItem('useremail');
        console.log("value of data: ", data);
        this.props.getMyPosts(data);
    }

    render(){


        const currentTodos = this.props.myPostDetails

        return (
            <div>
            {
              localStorage.getItem('JWT-TOKEN') == null ? <LoginNavbar/> : <Navbar/>
            }
            {
              localStorage.getItem('JWT-TOKEN') == null ? '' :
              <div className = "centralDiv">
                <h2>Manage your Questions</h2>
                <hr/>
                <div style={{ 'margin-top':'40px'}}>
                {
                    currentTodos.map((idea)=>{
                        return(<HomeCard feed={idea}/>);
                    })
                }
                <br/>
                </div>
                <div className = "rightDiv">

                </div>

              </div>
            }

            </div>
        )


    }
}

const mapStateToProps = state => {
    return {
        myPostDetails : state.FeedReducer.myposts,
     };
  };

function mapDispatchToProps(dispatch) {
      return bindActionCreators({ getMyPosts : getMyPosts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
