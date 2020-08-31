import React,{ Component } from "react";
import Navbar from "../navbar/Navbar"
import LoginNavbar from './../navbar/loginNavbar.jsx';
import HomeCard from "./homecard.js"

import {bindActionCreators} from 'redux';
import { connect } from "react-redux";
import {getAdminQuestions} from './../../api/Api';

class Admin extends Component{

    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentWillMount(){
        const data = localStorage.getItem('useremail');
        console.log("value of data: ", data);
        this.props.getAdminQuestions(data);
    }

    render(){
        const currentTodos = this.props.myAdminDetails
        return(
            <div>
                {
                localStorage.getItem('JWT-TOKEN') == null ? <LoginNavbar/> : <Navbar/>
                }
                {
                localStorage.getItem('JWT-TOKEN') == null ? '' :
                    <div className = "centralDiv">
                    <h2>Manage Ideas</h2>
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
        myAdminDetails : state.FeedReducer.myAdminDetails,
     };
  };

function mapDispatchToProps(dispatch) {
      return bindActionCreators({ getAdminQuestions : getAdminQuestions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
