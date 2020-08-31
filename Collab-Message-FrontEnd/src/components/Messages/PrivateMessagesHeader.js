import React, { useEffect } from "react";
import { Header, Segment} from "semantic-ui-react";
import Tooltip from '@material-ui/core/Tooltip';
import { Menu, Icon, Modal, Form, Input, Button, Label } from "semantic-ui-react";
import { runInThisContext } from "vm";

var dict = {};
var listofEmails = []
class PrivateMessagesHeader extends React.Component {

  state = {
    users: [],
    modal: false,
    channels: [],
    userObject:[],
    privateChannelUsers:{},
    privateChannelAddRequest:[],
    existingUsers:[]
  };
  componentDidMount() {

    let loadedUsers = [];
    console.log("inside friends = ",this.state.user)


    var url = 'http://localhost:8080/api/getaprivatechannel?channelName='+localStorage.getItem("CURRENTCHANNEL")
    fetch(url, {
      method: 'get'
    })
    .then((response)=> {
      return response.json();
    }).then((data)=>{
      
      if(data!=null && data.length>=1)
      {
      console.log("PRIVATE CHANNEL DETAILS = ",data[0].users)
      this.setState({existingUsers:data[0].users})
    }})

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
        if(this.state.existingUsers!=null){
      if(listofEmails.includes(data[i].emailId) && !this.state.existingUsers.includes(data[i].emailId)){
          listofUsers.push({username:data[i].username,emailId:data[i].emailId})
          onlynames.push(data[i].username)
          console.log("Modal Username = ", data[i].username)
      }
    }
 } // this will be a string
    this.setState({users:onlynames})
    this.setState({userObject:listofUsers})
  });
}
})


var url='http://localhost:8080/api/getprivatechannels?user='+localStorage.getItem('emailId')
fetch(url, {
    method: 'get',
  })
 .then(Response => {
  Response.json().then(channelList => {
  let loadedChannels = [];      
  this.setState({channels:channelList});
  console.log("PRIVATE CHANNESLS LIST = " ,channelList[0].users)
  })
})

  }

  handleSubmit(privateChannelAddRequest){
    fetch('http://localhost:8080/api/addnewtoprivate', {
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

    fetch('http://localhost:8080/api/removefromprivate?channel='+localStorage.getItem("CURRENTCHANNEL")+"&user="+localStorage.getItem("emailId"), {
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

    const { modal,users, userObject, privateChannelAddRequest,existingUsers } = this.state;

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
          <Header.Subheader>{numUniqueUsers}</Header.Subheader>
        </Header>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       
        {/* Channel Search Input */}
        <Menu.Menu className="menu">
          <Menu.Item>
            <span>
              <Icon name="mail"
                color="yellow"/>
            </span>
            @{localStorage.getItem("CURRENTCHANNEL")}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <Icon name="add" onClick={this.openModal} /> Add Users
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Icon name="remove" onClick={this.removeFromPrivate} /> Leave Group &nbsp;&nbsp;
          </Menu.Item>
        </Menu.Menu>

        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add members</Modal.Header>
          <Modal.Content>
            <Form >
              <Form.Field>
              <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="users" /> 
          </span>{" "}
          ({users.length})
        </Menu.Item>
        {userObject.map((user =>
         <Menu.Item
            key={user}
            style={{ opacity: 1.0, fontStyle: "italic", fontSize: 16, marginBottom:2}}
          >
            <Icon
              name="circle"
              color="blue"
            />
<Tooltip title={user.username}>
  <Button>{user.username}</Button>
</Tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button className="AlignRightButton"
            onClick={() => this.sendPrivateChannelRequest(user)}
            color="green"
            content="add"
            style={{ width: 100, marginBottom: 2, height:35}}>
            </Button>
          </Menu.Item>
          
        ))} 
      </Menu.Menu>
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={() => this.handleSubmit(privateChannelAddRequest)}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
          
        </Header>




      </Segment>
    );
  }
}

export default PrivateMessagesHeader;
