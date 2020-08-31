import React,{ Component } from "react";
import "./ideaPost.css"
import IdeaHeadline from "./ideaHeadline.js"
import IdeaDescription from "./ideaDescription.js"
import IdeaField from "./ideaField"
import IdeaGenre from "./ideaGenre"
import Button from '@material-ui/core/Button';
import Navbar from "../navbar/Navbar"
import IdeaSubmit from "./ideaSubmit.js"
import {bindActionCreators} from 'redux';
import {postIdea,closeSnackBar} from './../../api/Api';
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import LoginNavbar from './../navbar/loginNavbar.jsx';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

class IdeaPost extends Component{
    constructor(props){
        super(props)
        this.state = {
            RedirectToIdeaHeadline : true,
            RedirectToIdeaDescription : false,
            RedirectToIdeaField : false,
            RedirectToIdeaGenre : false,
            RedirectToIdeaSubmit : false,
            Headline : " ",
            IdeaDescription : "",
            idea_field : "",
            idea_type : "",
            idea_genre : ""
        }
        this.handleIdeaHeadline = this.handleIdeaHeadline.bind(this)
        this.handleIdeaDescription = this.handleIdeaDescription.bind(this)
        this.handleIdeaField = this.handleIdeaField.bind(this)
        this.handleIdeaGenre = this.handleIdeaGenre.bind(this)
        this.handleIdeaType = this.handleIdeaType.bind(this)
        this.handleSubmitIdea = this.handleSubmitIdea.bind(this)
    }

    handleIdeaHeadline(data){
        this.setState({"Headline":data})
    }
    handleIdeaDescription(data){
        this.setState({"IdeaDescription":data})
    }
    handleIdeaField(data){
        this.setState({"idea_field":data})
    }

    handleIdeaGenre(data){
        this.setState({"idea_genre":data})
    }

    handleIdeaType(data){
        this.setState({"idea_type":data})
    }

    onClickRedirecttoIdeaHeadline = () => {
        this.setState({"RedirectToIdeaHeadline" : true})
        this.setState({"RedirectToIdeaDescription" : false})
        this.setState({"RedirectToIdeaField" : false})
        this.setState({"RedirectToIdeaGenre" : false})
        this.setState({"RedirectToIdeaSubmit":false})

    }

    onClickRedirecttoIdeaDescription = () => {
        this.setState({"RedirectToIdeaDescription" : true})
        this.setState({"RedirectToIdeaHeadline" : false})
        this.setState({"RedirectToIdeaField" : false})
        this.setState({"RedirectToIdeaGenre" : false})
        this.setState({"RedirectToIdeaSubmit":false})

    }

    onClickRedirecttoIdeaField = () => {
        this.setState({"RedirectToIdeaDescription" : false})
        this.setState({"RedirectToIdeaHeadline" : false})
        this.setState({"RedirectToIdeaField" : true})
        this.setState({"RedirectToIdeaGenre" : false})
        this.setState({"RedirectToIdeaSubmit":false})

    }

    onClickRedirecttoIdeaGenre =() => {
        this.setState({"RedirectToIdeaDescription" : false})
        this.setState({"RedirectToIdeaHeadline" : false})
        this.setState({"RedirectToIdeaField" : false})
        this.setState({"RedirectToIdeaGenre" : true})
        this.setState({"RedirectToIdeaSubmit":false})

    }
    onClickRedirecttoIdeaShow = () =>{
        this.setState({"RedirectToIdeaDescription" : false})
        this.setState({"RedirectToIdeaHeadline" : false})
        this.setState({"RedirectToIdeaField" : false})
        this.setState({"RedirectToIdeaGenre" : false})
        this.setState({"RedirectToIdeaSubmit":true})
    }

    handleSubmitIdea = () =>{
        console.log("Idea Submitted")
        const body = {
            "status": true,
            "idea_owner": "vaishnavi94.ramesh@gmail.com",
            "idea_owner_name": "Vaishnavi Ramesh",
            "idea_genre": this.state.idea_genre,
            "idea_headline": this.state.Headline,
            "idea_description": this.state.IdeaDescription,
            "idea_field": this.state.idea_field,
            "idea_type": this.state.idea_type,
          }
          this.props.postIdea(body)
    }
    render(){
        let redirecty = null

        if(this.state.RedirectToIdeaHeadline === true){
            redirecty = (<IdeaHeadline
                Headline = {this.state.Headline}
                IdeaDescription = {this.state.IdeaDescription}
                handleIdeaHeadline = {this.handleIdeaHeadline}
                handleIdeaDescription = {this.handleIdeaDescription}
                ></IdeaHeadline>)
        }
        if(this.state.RedirectToIdeaDescription === true){
            redirecty = (<IdeaDescription

                ></IdeaDescription>)
        }
        if(this.state.RedirectToIdeaField === true){
            redirecty = (<IdeaField
                handleIdeaField = {this.handleIdeaField}
                handleIdeaGenre = {this.handleIdeaGenre}
                ></IdeaField>)
        }
        if(this.state.RedirectToIdeaGenre === true){
            redirecty = (<IdeaGenre
                handleIdeaType = {this.handleIdeaType}
                ></IdeaGenre>)
        }
        if(this.state.RedirectToIdeaSubmit === true){
            redirecty = (<IdeaSubmit
                Headline = {this.state.Headline}
                IdeaDescription = {this.state.IdeaDescription}
                IdeaField = {this.state.idea_field}
                IdeaType = {this.state.idea_type}
                IdeaGenre = {this.state.idea_genre}
                handleSubmitIdea = {this.handleSubmitIdea}
                >
                </IdeaSubmit>)
        }

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            this.props.closeSnackBar()

          };


        let alert = null
        if(this.props.similarSentence == true){
           alert = <div><Snackbar open={this.props.similarSentence} autoHideDuration={6000} onClose={handleClose}>
           <Alert onClose={handleClose} severity="error">
           There might be possible duplicates to this idea. An admin will review it to avoid idea duplicacy.
           </Alert>
           </Snackbar>
           </div>
        }
        else{
          alert = null
        }


        return (
            <div>
            {
              localStorage.getItem('JWT-TOKEN') == null ? <LoginNavbar/> : <Navbar/>
            }
            {
              localStorage.getItem('JWT-TOKEN') == null ? '' : <div class="row" style={{"margin-left":"10%","margin-top":"10%"}}>
                  <div class="lefty col-2">
                      <Button size="large" onClick = {this.onClickRedirecttoIdeaHeadline} data-target="#Location">
                      Idea Headline & Description
                      </Button>
                      <br />
                      <br />
                      {/*<Button size="large" onClick = {this.onClickRedirecttoIdeaDescription} data-target="#Location">
                      Idea Photos
      </Button>
                      <br />
                      <br />*/}
                      <Button size="large" onClick = {this.onClickRedirecttoIdeaField} data-target="#Location">
                      Idea Field
                      </Button>
                      <br />
                      <br />
                      <Button size="large" onClick = {this.onClickRedirecttoIdeaGenre} data-target="#Location">
                      Idea Type
                      </Button>
                      <br />
                      <br />
                      <Button size="large" onClick = {this.onClickRedirecttoIdeaShow} data-target="#Location">
                      Idea Submit
                      </Button>
                  </div>
                  <div class="right col-8">
                      {redirecty}
                  </div>
                  {alert}

              </div>
            }



            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        similarSentence : state.FeedReducer.similarSentence
     };
  };

function mapDispatchToProps(dispatch) {
      return bindActionCreators({ postIdea:postIdea,closeSnackBar:closeSnackBar}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeaPost);
