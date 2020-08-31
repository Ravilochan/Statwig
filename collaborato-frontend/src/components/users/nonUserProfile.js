import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './userProfile.css';
import { Button,
  Container,
  Divider,
  Dropdown,
  Header,
  Message,
  Segment } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css';
import { Multiselect } from "multiselect-react-dropdown";
import Spinner from './spinner'
import Images from './images'
import Buttons from './button'
import './users.css'
import { throws } from 'assert';
import Navbar from './../navbar/Navbar.jsx';
import StyledButton from '../Elements/materialButton.js';

class NonuserProfile extends Component {

	 constructor(props) {
	    super(props);
	    this.state = {
	      FirstName: '',
	      LastName: '',
	      PrimaryEmail: '',
        Contact: '',
        Gender: '',
        AboutMe: '',
        Languages: '',
          StreetAddress: '',
          Enabled:'',
          DOB:'',
	      City : '',
	      State : '',
          Country: '',
          alreadySelected:[],
          plainArray: ['Science','Technology','Healthcare','Movie','Literature','ArtificialIntelligence','Engineering','Environment','MedicalScience'],
          uploading: false,
          images: [],
          API_URL:"NO IMAGE SELECTED",
          selectValue:[],
          loading: false,
          ProfilePic:null,
          Title:'',
          pendingFriend:false,
          alreadyFriend:false,
	    }
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    handleDropdownChange(e) {
      console.log("SELECTED")
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

    onCountryChange = (event) => {
    this.setState({Country: event.target.value})
  }

  onStreetAddressChange = (event) => {
    this.setState({StreetAddress: event.target.value})
  }

  onCityChange = (event) => {
    this.setState({City: event.target.value})
  }
    onStateChange = (event) => {
    this.setState({State: event.target.value})
  }

   onGenderChange = (event) => {
    this.setState({Gender: event.target.value})
  }

  onLanguageChange = (event) => {
    this.setState({Languages: event.target.value})
  }

  onContactChange = (event) => {
    this.setState({Contact: event.target.value})
  }

  onAboutMeChange = (event) => {
    this.setState({AboutMe: event.target.value})
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

onRemove = (selectedList, removedItem) => {
//     console.log("REMOBVED" , removedItem)
//     var newArr = this.state.selectValue;
//     if(removedItem=="Science"){
//     var obj = {"prefName" : "Science","prefId" : "1"};
//     for (var it = newArr.values(), val= null; val=it.next().value; ) {
//     console.log(val);
// }
//        newArr.delete(obj);
//     }
//     else if(removedItem=="Technology"){
//     var obj = {"prefName" : "Technology","prefId" : "2"};
//     for (var it = newArr.values(), val= null; val=it.next().value; ) {
//         console.log(val);
//     }
//         newArr.delete(obj);
//     }
//     else if(removedItem=="Healthcare"){
//         var obj = {"prefName" : "Healthcare","prefId" : "3"};
//         for (var it = newArr.values(), val= null; val=it.next().value; ) {
//             console.log(val.prefName);
//         }
//             newArr.delete(obj);
//     }
//     else if(removedItem=="Movie"){
//         var obj = {"prefName" : "Movie","prefId" : "4"};
//         for (var it = newArr.values(), val= null; val=it.next().value; ) {
//             console.log(val.prefName);
//         }
//             newArr.delete(obj);
//     }
//     else if(removedItem=="Literature"){
//         var obj = {prefName : "Literature",prefId : "5"};
//         for (var it = newArr.values(), val= null; val=it.next().value; ) {
//             console.log(val.prefName);
//         }
//             newArr.delete(obj);
//     }
//     else if(removedItem=="ArtificialIntelligence"){
//         console.log("GREEEEEE")
//         var obj = {"prefName" : "ArtificalIntelligence","prefId" : "6"};
//         for (var it = newArr.values(), val= null; val=it.next().value; ) {
//             if(val.prefName == "ArtificialIntelligence")
//             {
//                 newArr.delete(val);
//             }
//         }
//         newArr.delete(obj);
//     }
//     else if(removedItem=="Engineering"){
//         var obj = {"prefName" : "Engineering","prefId" : "7"};
//             newArr.delete(obj);
//     }
//     else if(removedItem=="Environment"){
//         var obj = {"prefName" : "Environment","prefId" : "8"};
//             newArr.delete(obj);

//     }
//     else if(removedItem=="MedicalScience"){
//         var obj = {"prefName" : "MedicalScience","prefId" : "9"};
//             newArr.delete(obj);

//     }
//     this.setState({selectValue:newArr})
}

/*   */


  SubmitChanges = (event) => {
    // event.preventDefault()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("JWT-TOKEN"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"emailId":localStorage.getItem("emailId"),"username":localStorage.getItem("username"),"enabled":false,"gender":this.state.Gender,"language":this.state.Languages,"li":this.state.selectValue,"country":this.state.Country, "contact":this.state.Contact,"state":this.state.State,"aboutME":this.state.AboutMe,"homeTown":this.state.City});

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch("http://localhost:8102/api/editProfile", requestOptions)
      .then(response => response.json())
      .then(user => {
          window.location.reload();
          console.log("UPDATE FROM UPDYE",user)
      })
      .catch(error => console.log('error', error));



   // var raw = JSON.stringify({"emailId":localStorage.getItem("emailId"),"username":localStorage.getItem("username"),"password":this.state.Password,"firstName":this.state.FirstName,"lastName":this.state.LastName,});
//console.log("VLAUES",this.state.FirstName,this.state.LastName, this.state.emailId,this.state.AboutMe,this.state.City,this.state.Languages,this.state.Gender, this.state.State, this.state.Country,this.state.Contact, this.state.selectValue)
    // var url = 'http://localhost:8102/api/editProfile'
    //   fetch(url, {
    //   method: 'put',
    //   headers: myHeaders,
    //   body:JSON.stringify({
    //       emailId:localStorage.getItem("emailId"),
    //       enabled:this.state.Enabled,
    //       dob:this.state.DOB,
    //       li:this.state.selectValue,
    //       aboutMe:this.state.AboutMe,
    //       gender:this.state.Gender,
    //       contact:this.state.Contact,
    //       country:this.state.Country,
    //       homeTown:this.state.City,
    //       language:this.state.Languages
    //   })
    //   //body:  JSON.stringify({"emailId":localStorage.getItem("emailId"),"username":localStorage.getItem("username"),"aboutMe":this.state.AboutMe,"gender":this.state.Gender})
    // })
    // .then(response =>  response.json())
    // .then(user => {
    //   console.log("NAME" + user)
    //   })
  }



    componentDidMount() {
        var url = 'http://localhost:8102/api/get/'+localStorage.getItem("nonusername")
        console.log("URL IS " + url)
        fetch(url, {
          method: 'get',
        })
        .then(response =>  response.json())
        .then(user => {
            if(user.profilePic!=null)
                this.setState({API_URL:user.profilePic.data});
      console.log("INFO = " , user);
      console.log(user.firstName);
      this.setState({FirstName: user.firstName})
      this.setState({LastName: user.lastName})
      this.setState({PrimaryEmail: user.emailId})
      this.setState({AboutMe : user.aboutME})
      this.setState({Country: user.country})
      this.setState({City: user.homeTown})
      this.setState({State: user.state})
      this.setState({Gender: user.gender})
      this.setState({Contact: user.contact})
      this.setState({Languages: user.language})
      this.setState({DOB: user.dob})
      this.setState({selectedValues: user.li})
      this.setState({profilePic: user.profilePic})
      this.setState({Title: user.title})
      localStorage.setItem("bio",user.aboutME)
      var arr=[]
      var newArr=[]
      for(var i=0;i<user.li.length;i++)
      {
        console.log("Adding",user.li[i].prefName )
         arr.push(user.li[i].prefName)
         var selectedItem = user.li[i].prefName
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
      this.setState({alreadySelected:arr})
      this.setState({selectedValues: user.li})
      console.log("USERLI=",user.li)
      console.log("inside friends = ",this.state.user)
      var url = 'http://localhost:8102/api/getFriends?user='+localStorage.getItem("emailId");
      fetch(url, {
        method: 'get'
      })
      .then((response)=> {
        return response.json();
      }).then((data)=>{
        var listofEmails = []
        var pendingEmails = []
        if(data!=null && data.length>=1)
        {
        var obj = JSON.parse(data[0])
        console.log("ANSWR",data[0])
  
        for(var i=0;i<obj.friends.length;i++){
          listofEmails.push(obj.friends[i])
        } // this will be a string
        // for(var i=0;i<obj.pending.length;i++){
        //     pendingEmails.push(obj.pending[i])
        //   } 
    
    var url = 'http://localhost:8102/api/getusers'
    fetch(url, {
      method: 'get'
    })
    .then((response)=> {
      return response.json();
    }).then((data)=>{
      var listofUsers = []
      var pendingUsers = []
      for(var i=0;i<data.length;i++){
        if(listofEmails.includes(data[i].emailId))
            listofUsers.push(data[i].username)
        // if(pendingEmails.includes(data[i].emailId))
        //     pendingUsers.push(data[i].username)
      } // this will be a string

      for(var i=0;i<data.length;i++){
        if(listofUsers.includes(localStorage.getItem("nonusername")))
        {
            this.setState({alreadyFriend:true})
            break;
        }
    }

    // for(var i=0;i<data.length;i++){
    //     if(pendingUsers.includes(localStorage.getItem("nonusername")))
    //     {
    //         this.setState({pendingFriend:true})
    //         break;
    //     }
    // }

    });
  }



var url = 'http://localhost:8102/api/getRequests?user='+this.state.PrimaryEmail;
console.log("REQ URL", url)
fetch(url, {
  method: 'get',
  headers: {'Content-Type': 'application/json'},
})
.then((response)=> {
    return response.json();
  }).then((data)=>{
    if(data!=null && data.length>=1)
    {
    var obj = JSON.parse(data[0]);
    console.log("NEW PEND= ",obj.pending)
    var listofEmails = []
    for(var i=0;i<obj.pending.length;i++){
        listofEmails.push(obj.pending[i])
    } // this will be a string
var url = 'http://localhost:8102/api/getusers'
fetch(url, {
  method: 'get'
})
.then((response)=> {
  return response.json();
}).then((data)=>{
  var listofUsers = []
  for(var i=0;i<data.length;i++){
    if(listofEmails.includes(data[i].emailId))
        listofUsers.push(data[i].username)
  }

  for(var i=0;i<data.length;i++){
    if(listofUsers.includes(localStorage.getItem("username")))
    {
        console.log("FOUND IN PENDING")
        this.setState({pendingFriend:true})
        break;
    }else{
        console.log("NOT FOUND IN PENDING")
        this.setState({pendingFriend:false})
    }
}
  // this will be a string
});
}
    });
  })

})



    }


    //   var url = 'http://localhost:8102/api/get/'+localStorage.getItem("username")
    // console.log("URL IS " + url)
    // fetch(url, {
    //   method: 'get',
    // })
    // .then(response =>  response.json())
    // .then(user => {
    //     if(user.profilePic!=null)
    //   this.setState({API_URL:user.profilePic.data});
    //   })


    
//   var url = 'http://localhost:8102/api/getusers'
//   fetch(url, {
//     method: 'get'
//   })
//   .then((response)=> {
//     return response.json();
//   }).then((data)=>{
//     var listofUsers = []
//     for(var i=0;i<data.length;i++){
//       if(listofEmails.includes(localStorage.getItem("")))
//           listofUsers.push(data[i].username)
//     } // this will be a string
//     this.setState({users:listofUsers})
//   });
// }
// })




  onChange = e => {
    const files = Array.from(e.target.files)
    this.setState({ uploading: true })

    const formData = new FormData()
   // formData.append("image", files[0])
   formData.append("image", files[0], files[0].name);
   var myHeaders = new Headers();
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formData,
  redirect: 'follow'
};

// fetch("http://localhost:8102/api/image-upload?title=srinivas&username=srinivas", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));


    var url = 'http://localhost:8102/api/image-upload?title='+localStorage.getItem("nonusername")+'&username='+localStorage.getItem("nonusername")
    console.log("IMAGE URL", url)
    fetch(url, requestOptions)
    .then(res => res.json())
    .then(images => {
      this.setState({
        uploading: false,
        images
      })
    })
  }

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id)
    })
  }


	componentWillMount() {
        var url = 'http://localhost:8102/api/get/'+localStorage.getItem("nonusername")
        console.log("URL IS " + url)
        fetch(url, {
          method: 'get',
        })
        .then(response => {
                response.json()
        }
            )
        .then(user => {
            if(user!=null){
            if(user.profilePic!=null){
             this.setState({API_URL:user.profilePic.data});
            }
      console.log(user);
      console.log(user.firstName);
      this.setState({FirstName: user.firstName})
      this.setState({LastName: user.lastName})
      this.setState({PrimaryEmail: user.emailId})
      this.setState({AboutMe : user.aboutMe})
      this.setState({Country: user.country})
      this.setState({City: user.homeTown})
      this.setState({State: user.state})
      this.setState({Gender: user.gender})
      this.setState({Contact: user.contact})
      this.setState({Languages: user.language})
      this.setState({DOB: user.dob})
      this.setState({selectedValues: user.li})
      this.setState({profilePic: user.profilePic})
      this.setState({Title: user.title})
            }
      })
    }

    
sendFriendRequest = () => {
    console.log("FROM ",localStorage.getItem("emailId"))
    console.log("TO ",this.state.PrimaryEmail) 
    this.setState({pendingFriend:true})
    fetch('http://localhost:8102/api/sendRequest', {
      method: 'post',
      headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify({
        fromEmailId:localStorage.getItem("emailId"),
        toEmailId:this.state.PrimaryEmail,
      })})
      .then((response)=> {
        return response.json();
      }).then((data)=>{
       this.setState({pendingFriend:true})
    })
}

  /*
Profile Image, Name, Email, Phone Number, About Me,City, Country, Company, School, Hometown, Languages, Gender)
  */

	render ()
	{
        const { uploading, images, API_URL, selectValue, alreadyFriend,pendingFriend } = this.state
        console.log("PENDING STATUS ", pendingFriend)
        var friendYes = null
        if(alreadyFriend==true && pendingFriend==false)
        {
            friendYes = <a href="http://localhost:3002/messages"
            name="Messaging"
            ><StyledButton text={"Message"}/></a>
        }
        else if(alreadyFriend==false && pendingFriend==false){
            friendYes = <Link to="/user/details"
            name="Connect"
            onClick = {()=>this.sendFriendRequest()}
            ><StyledButton text={"Connect"}/></Link>
        }
        else if(alreadyFriend==false && pendingFriend==true){
            friendYes = <StyledButton text={"Invitation Pending"}/>
        }

        const content = () => {
          switch(true) {
            case images.length > 0:
              return <Images images={images} removeImage={this.removeImage} />
          }
        }

        const Example = ({ API_URL }) => <img src={`data:image/jpeg;base64,${API_URL}`} />

		return (
            <div> <Navbar/>
  <div class="accountinfo">
<div class="container shadowingcontainertraveller">
  <h1 class="page-header">Profile information</h1>
  <div class="row">
    <div class="col-md-12 col-sm-6 col-xs-12">
      <div class="text-center">
      <img src={`data:image/jpeg;base64,${API_URL}`} width="180" height="150" onError={(e)=>{e.target.onerror = null; e.target.src="https://www.imsa-search.com/wp-content/uploads/2018/06/avatar.png"}}/>
        {content()}
      </div>
      <br></br>
      {friendYes}
    </div>
    </div>
      <div class="col-md-12 col-sm-8 col-xs-12 forum">
          <h4 class="mb-3"></h4>
          <section className="form-elegant" >
          <form class="needs-validation" novalidate="">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">First name</label>
                <input type="text" class="form-control form-control-lg" id="firstName" placeholder="" value={this.state.FirstName} required="" disabled onChange={this.onFirstNameChange}/>
                <div class="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="lastName">Last name</label>
                <input type="text" class="form-control form-control-lg" id="lastName" placeholder="" value={this.state.LastName} required="" disabled onChange={this.onLastNameChange}/>
                <div class="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label for="email">Email <span class="text-muted"></span></label>
              <input type="email" class="form-control form-control-lg" id="email" placeholder="you@example.com" value={this.state.PrimaryEmail} disabled onChange={this.onPrimaryEmailChange}/>
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div class="mb-3">
              <label for="address">About me</label>
              <textarea type="textarea" class="form-control form-control-lg" id="address" placeholder=""  value={this.state.AboutMe} disabled onChange={this.onAboutMeChange} required="" />
              <div class="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div class="mb-3">
              <label for="address2">Preferences <span class="text-muted"></span></label>
              <Multiselect class="form-control form-control-lg" options={this.state.plainArray} selectedValues={this.state.alreadySelected} disabled isObject={false} onSelect={this.onSelect}
onRemove={this.onRemove}
displayValue="Preferences" ></Multiselect>
            </div>


            <div class="row">
               <div class="col-md-3 mb-3">
                <label for="zip">Hometown</label>
                <input type="text" class="form-control form-control-lg" id="zip" placeholder="" required="" value={this.state.City} disabled onChange={this.onCityChange} />
                <div class="invalid-feedback">
                  Zip code required.
                </div>
              </div>
                <div class="col-md-3 mb-3">
                <label for="zip">Language</label>
                <input type="text" class="form-control form-control-lg" id="zip" placeholder="" required="" value={this.state.Languages}  disabled onChange={this.onLanguageChange} />
                <div class="invalid-feedback">
                  Zip code required.
                </div>
              </div>

              <div class="col-md-3 mb-3">
                <label for="zip">Gender</label>
                <input type="text" class="form-control form-control-lg" id="zip" placeholder="" required="" value={this.state.Gender} disabled onChange={this.onGenderChange} />
                <div class="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>
            <div class="row">
             <div class="col-md-3 mb-3">
                <label for="zip">Country</label>
                <input type="text" class="form-control form-control-lg" id="zip"  onChange={this.onCountryChange} disabled value={this.state.Country} placeholder="" required="" />
                <div class="invalid-feedback">
                  Enter correct value
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="zip">State</label>
                <input type="text" class="form-control form-control-lg" id="zip"  onChange={this.onStateChange} disabled value={this.state.State} placeholder="" required="" />
                <div class="invalid-feedback">
                  Enter correct value
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="zip">Contact</label>
                <input type="text" class="form-control form-control-lg" id="zip" onChange={this.onContactChange} disabled value={this.state.Contact} placeholder="" required="" />
                <div class="invalid-feedback">
                  Contact required.
                </div>
              </div>
            </div>
            {/* <button class="bluebutton btn btn-lg btn-block whitefont"  onClick= {this.SubmitChanges} disabled type="button" >Save Changes</button> */}
            <br/>
          </form>
          </section>
      </div>
      </div>

      </div>
      </div>

		);
	}
}

export default NonuserProfile;
