import React from 'react';
import './login.css';
import { Container, Row, Col, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      Redirection_Value : false,
      errors : false
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:8102/api/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      emailId: this.state.signInEmail,
      password: this.state.signInPassword
      })
    })
    .then(response => {
      if(response.status != 200)
        {
          this.setState({errors : true})
        }
      else
        {
          response.json()
          .then(user => {
          console.log("NAME" + user)
          localStorage.setItem("username",user[0])
          localStorage.setItem("useremail",this.state.signInEmail)
          localStorage.setItem("emailId",this.state.signInEmail)
          localStorage.setItem("bio","")
          localStorage.setItem("JWT-TOKEN",user[1])
          this.setState({Redirection_Value : true})
          })
        }
      })
  }

  render()
  {
    let Redirecty = null;
    let Errors = null;
      console.log("HEEREE")
    if(this.state.Redirection_Value === true && localStorage.getItem("JWT-TOKEN")!=null)
    {
     Redirecty =  <Redirect to="/feed"/>
    }
    if(this.state.errors === true)
    {
      Errors = <p class="error">Username or Password doesn't exist </p>
    }
    return(
        <div class="backgroundcontainer" >
    <img class="bg" src='https://qualitymatters.nice.org.uk/collaboration-in-practice/assets/UcK8uc0CSm/collaboration-background-1920x1080.png?h=30&la=en&w=400'/>
    <br/>
    <br/>
    <br/>
      <Container>
        <section className="form-elegant">
          <Row >
            <Col md="4" className="mx-auto">
              <Card>
                <CardBody className="mx-4 card-color">
                  <div className="text-center">
                    <h2 className="dark-grey-text mb-5 bold">Collaborato</h2>
                    <h3 className="dark-grey-text mb-5">Account Login</h3>
                    <p className="grey-text d-flex justify-content-center">Not a member? <a href="/signup" className="blue-text ml-1">Sign Up</a></p>
                    <hr></hr>
                  </div>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"  onChange={this.onEmailChange} required/>
                  <br>
                  </br>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={this.onPasswordChange} required/>
                   <br>
                  </br>
                  <p className="blue-text d-flex pb-3">Forgot <a href="/yettobebuilt" className="blue-text ml-1"> Password?</a></p>
                  <div className="text-center mb-3">
                    <Button type="button" gradient="blue" className="btn btn-primary btn-lg btn-block" onClick = {this.onSubmitSignIn}>Log In</Button>
                      <hr></hr>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </section>
         {Redirecty}
         {Errors}
      </Container>
      </div>
      );
  }
}

export default Login;
