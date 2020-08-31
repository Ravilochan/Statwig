import React, { useEffect } from "react";
import { Header, Segment} from "semantic-ui-react";
import Tooltip from '@material-ui/core/Tooltip';
import { Menu, Icon, Modal, Form, Input, Button, Label } from "semantic-ui-react";
import { runInThisContext } from "vm";

var dict = {};
var listofEmails = []
class MessagesHeader extends React.Component {

  state = {
    users: [],
    modal: false,
    channels: [],
    userObject:[],
    privateChannelUsers:{},
    privateChannelAddRequest:[]
  };
  componentDidMount() {

    let loadedUsers = [];
    console.log("inside friends = ",this.state.user)
    var url = 'http://localhost:8102/api/getFriends?user='+localStorage.getItem("emailId");
    fetch(url, {
      method: 'get'
    })
    .then((response)=> {
      return response.json();
    }).then((data)=>{
      
      if(data!=null && data.length>=1)
      {
      var obj = JSON.parse(data[0])
      console.log("ANSWER = ",data[0])

      for(var i=0;i<obj.friends.length;i++){
        listofEmails.push(obj.friends[i])
      } // this will be a string
  var url = 'http://localhost:8102/api/getusers'
  fetch(url, {
    method: 'get'
  })
  .then((response)=> {
    return response.json();
  }).then((data)=>{
    var listofUsers = []
    var onlynames = []
    for(var i=0;i<data.length;i++){
      if(listofEmails.includes(data[i].emailId)){
          listofUsers.push({username:data[i].username,emailId:data[i].emailId})
          onlynames.push(data[i].username)
          console.log("Modal Username = ", data[i].username)
      }
    } // this will be a string
    this.setState({users:onlynames})
    this.setState({userObject:listofUsers})
  });
}
})
  }

  handleSubmit(privateChannelAddRequest){
    fetch('http://localhost:8080/api/addtoprivate', {
        method: 'post',
        headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify({
          channelName:localStorage.getItem("CURRENTCHANNEL"),
          participants:privateChannelAddRequest    
        })})
        .then((response)=> {
          return response.json();
        }).then((data)=>{
          console.log("SENT")
        })
  }


  sendPrivateChannelRequest(user){
    var x=this.state.privateChannelAddRequest
    x.push("'"+user.emailId+"'")
    console.log("Adding ",user.emailId)
    this.setState({privateChannelAddRequest:x})
    console.log("TOTAL", this.state.privateChannelAddRequest.length)
  }

  removeFromPrivate(user){

    fetch('http://localhost:8080/api/removefromprivate?channel='+localStorage.getItem("CURRENTCHANNEL"), {
        method: 'get'
        })
        .then((response)=> {
          return response.json();
        }).then((data)=>{
          console.log("SENT")
        })
  }
    

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });
  
  render() {
    const {
      channelName,
      numUniqueUsers,
      handleSearchChange,
      searchLoading,
      isPrivateChannel,
      handleStar,
      isChannelStarred
    } = this.props;

    const { modal,users, userObject, privateChannelAddRequest } = this.state;

    

    return (
      <Segment clearing >
        {/* Channel Title */}
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            {!isPrivateChannel && (
              <Icon
                onClick={handleStar}
                name="star"
                color="yellow"
              />
            )}
          </span>
          <Header.Subheader></Header.Subheader>
        </Header>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
              <Icon
                name="mail"
                color="black"
              />
          </span>
          @{localStorage.getItem("TEST")}
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;
