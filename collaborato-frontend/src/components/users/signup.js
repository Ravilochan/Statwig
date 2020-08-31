import React from 'react';
import './signup.css';
import ReactSuperSelect from 'react-super-select';
import { Container, Row, Col, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
import TokenInput from "react-tokeninput";
import ComboboxOption from "react-tokeninput";
import { Multiselect } from "multiselect-react-dropdown";
import SweetAlert from 'sweetalert-react';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      FirstName : '',
      LastName : '',
      PrimaryEmail : '',
      Password: '',
      Username : '',
      dateofbirth: '',
      Redirection_Value : false,
      errors : false,
      input: '',
    loading: false,
    Verified: false,
    alreadySelected:[],
    plainArray: ['Science','Technology','Healthcare','Movie','Literature','ArtificialIntelligence','Engineering','Environment','MedicalScience'],
    selectValue:[],
    arr:[],
    success:false
    }

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleDropdownChange(e) {
    console.log("HERE")
    this.setState({ selectValue: e.target.value });
  }


  onFirstNameChange = (event) => {
    this.setState({FirstName: event.target.value})
  }

  onLastNameChange = (event) => {
    this.setState({LastName: event.target.value})
  }

  onPrimaryEmailChange = (event) => {
    this.setState({PrimaryEmail: event.target.value})
  }

   onUsernameChange  = (event) => {
    this.setState({Username: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onDOBChange = (event) => {
    this.setState({dateofbirth: event.target.value})
  }


  onSelect = (selectedList, selectedItem) =>{
    console.log("SELECTED ITEN", this.state.selectValue)
    var newArr = this.state.selectValue;
    if(selectedItem=="Science"){
    var obj = {"prefName" : "Science","prefId" : "1"};
      newArr.push(obj);
      this.setState({selectValue:newArr})
    }
    else if(selectedItem=="Technology"){
    var obj = {"prefName" : "Technology","prefId" : "2"};
      newArr.push(obj);
      this.setState({selectValue:newArr})
    }
    else if(selectedItem=="Healthcare"){
        var obj = {"prefName" : "Healthcare","prefId" : "3"};
          newArr.push(obj);
          this.setState({selectValue:newArr})
    }
    else if(selectedItem=="Movie"){
        var obj = {"prefName" : "Movie","prefId" : "4"};
          newArr.push(obj);
          this.setState({selectValue:newArr})
    }
    else if(selectedItem=="Literature"){
        var obj = {"prefName" : "Literature","prefId" : "5"};
          newArr.push(obj);
          this.setState({selectValue:newArr})
    }
    else if(selectedItem=="ArtificialIntelligence"){
        var obj = {"prefName" : "ArtificalIntelligence","prefId" : "6"};
          newArr.push(obj);
          this.setState({selectValue:newArr})
    }
    else if(selectedItem=="Engineering"){
        var obj = {"prefName" : "Engineering","prefId" : "7"};
          newArr.push(obj);
          this.setState({selectValue:newArr})
    }
    else if(selectedItem=="Environment"){
        var obj = {"prefName" : "Environment","prefId" : "8"};
          newArr.push(obj);
          this.setState({selectValue:newArr})
    }
    else if(selectedItem=="MedicalScience"){
        var obj = {"prefName" : "MedicalScience","prefId" : "9"};
          newArr.push(obj);
          this.setState({selectValue:newArr})
    }

}

onRemove(selectedList, removedItem) {

}


componentDidMount(){

}

  onSubmitSignIn = () => {
    this.setState({success:true})
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch('http://localhost:8102/api/signup', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstName: this.state.FirstName,
        lastName: this.state.LastName,
        username: this.state.Username,
        password: this.state.signInPassword,
        emailId : this.state.PrimaryEmail,
        dob: this.state.dateofbirth,
        li: this.state.selectValue,
        enabled:false,
        aboutMe:"",
        title:"",
        gender:"",
        contact:"",
        country:"",
        homeTown:"",
        language:"",
        state:""
      })
    })
    .then(response => {
      if(response.status === 400)
        {
          alert("HERE");
          this.setState({errors : true})
        }
      else
        {
          response.json()
          .then(user => {
          console.log("USER",user)
          localStorage.setItem("username",user[0])
          localStorage.setItem("useremail",this.state.PrimaryEmail)
          localStorage.setItem("emailId",this.state.PrimaryEmail)
          localStorage.setItem("bio","")
          localStorage.setItem("JWT-TOKEN",user[1])
          this.setState({Redirection_Value : true})
          })
        }
      })

    //   window.setInterval(() => {
    //     if(localStorage.getItem("username")!=null || localStorage.getItem("username")!=undefined ){
    //     var url = 'http://localhost:8102/api/get/'+localStorage.getItem("username")
    //         console.log("URL IS " + url)
    //         fetch(url, {
    //           method: 'get',
    //         })
    //         .then(response =>  {
    //           if(response.status!=200){
    //             response.json()
    //           }
    //         })
    //         .then(user => {
    //           if(user!=null || user!=undefined){
    //             console.log("LOG USER", user)
    //       this.setState({Verified: user.enabled})
    //           }
    //   }, 5000)
    // }})


  }

  render()
  {
    let Redirecty = null;
    let Errors = null;
    if(this.state.Redirection_Value === true && localStorage.getItem("JWT-TOKEN")!=null)
    {
     Redirecty =  <Redirect to="/" />
    }
      if(this.state.errors === true)
    {
      Errors = <p class="error"> Error Signing Up </p>
    }
    if(this.state.errors === false)
    {
      Errors = <p class="error"> Please verify your account via email </p>
    }
    return(
      <div class="backgroundcontainer">
      <img class="bg" src='https://qualitymatters.nice.org.uk/collaboration-in-practice/assets/UcK8uc0CSm/collaboration-background-1920x1080.png?h=30&la=en&w=400'/>
      <Container>

        <section className="form-elegant">
          <Row >
            <Col md="4" className="mx-auto">
              <Card>
                <CardBody className="mx-4">
                  <div className="text-center">
                    <h2 className="dark-grey-text mb-5 bold">Collaborato</h2>
                    <h3 className="dark-grey-text mb-5">Account SignUp</h3>
                    <h3 className="justify-content-center">Already have an account? <a href="/" className="blue-text ml-1"> Login</a></h3>
                    <hr></hr>
                  </div>
                  <input type="text" class="form-control" id="exampleInputFirstName" aria-describedby="emailHelp" placeholder="First Name"  onChange={this.onFirstNameChange} required/>
                  <br>
                  </br>
                  <input type="text" class="form-control" id="exampleInputSecondName" aria-describedby="emailHelp" placeholder="Last Name"  onChange={this.onLastNameChange} required/>
                  <br>
                  </br>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Primary email"  onChange={this.onPrimaryEmailChange} required/>
                  <br>
                  </br>
                  <input type="text" class="form-control" id="exampleInputusername" placeholder="Username"  onChange={this.onUsernameChange} required/>
                   <br>
                  </br>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={this.onPasswordChange} required/>
                   <br>
                  </br>
                  <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Date of birth : MM/DD/YYYY"  onChange={this.onDOBChange} required/>
                   <br>
                  </br>
                  <Multiselect class="small-font" options={this.state.plainArray} isObject={false} onSelect={this.onSelect}
onRemove={this.onRemove}
displayValue="Preferences" ></Multiselect>
                  <br>
                  </br>
                  <br></br>
                  <input type="checkbox" id="test6" data-toggle="modal" data-target="#myModal"/>
                    <label for="test6"><span class="red-star">★</span>Collaborato privacy policy</label>
                    <br/>
                   <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Collaborato User License and Agreement</h4>
      </div>
      <div class="modal-body">
        I hereby declare that I would not misuse the information available from other users on the platform. I understand that any such actions would have repurcussions that may lead to either trials under the court of law or a complete ban from the platform.
        I also confirm that I would not steal content posted by other users or misuse it in any manner possible. Any use of the respective content outside or on the platform means a complete consent by the content owner.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
 </div>
                  <div className="text-center mb-3">
                    <Button type="button" gradient="blue" className="btn btn-primary btn-lg btn-block" onClick = {this.onSubmitSignIn}>Sign Up</Button>
                    {/* <div class="modal fade" id="myModalNew" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  {/*<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Verigy your account</h4>
      </div>
      <div class="modal-body">
        Thank you for signing up to Collaborato!
        <p>Please verify your account by clicking on the confirmation link we sent to your registered email</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */} 
<SweetAlert
        show={this.state.success}
        title="Success"
        text="You have successfully signed up to Collaborato! Please verify your account by clicking on the confirmation link we sent to your registered email"
        onConfirm={() => this.setState({ success: false })}
      />
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

export default SignUp;
