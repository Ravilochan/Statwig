import React from "react";
import { Segment, Accordion, Header, Image, Button,Input } from "semantic-ui-react";
import { Menu, Icon } from "semantic-ui-react";
import Tooltip from '@material-ui/core/Tooltip';
import SweetAlert from 'sweetalert-react';

class AcceptBlock extends React.Component {
    constructor(props){
        super(props)
  this.state = {
    username:this.props.currentUser,
    usersEmails: [],
    users:[],
    success:false
  };

  this.addListeners = this.addListeners.bind(this);
}

  setActiveIndex = (event, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  componentDidMount() {
    if (this.state.username) {
      console.log("USERNAMEEEE",this.state.username)
      this.addListeners(this.state.username);
    }
  }

  addFriend(user){

    var url = 'http://localhost:8102/api/getusers'
    fetch(url, {
      method: 'get'
    })
    .then((response)=> {
      return response.json();
    }).then((data)=>{
      this.setState({selected:true})
      var listofUsers = []
      for(var i=0;i<data.length;i++){
        if(data[i].username===user)
           {
            console.log("SELECTED TRUE")
            fetch('http://localhost:8102/api/addFriend', {
                method: 'post',
                headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
                body: JSON.stringify({
                  fromEmailId:localStorage.getItem("emailId"),
                  toEmailId:data[i].emailId,
                })})
                .then((response)=> {
                  return response.json();
                }).then((data)=>{
                  window.location.reload(true)
                  console.log("Accepted")
                })
                window.location.reload(true)
           }
      } 
    })
    console.log("RELOADING")
}

blockFriend(user){
    var url = 'http://localhost:8102/api/getusers'
    fetch(url, {
      method: 'get'
    })
    .then((response)=> {
      return response.json();
    }).then((data)=>{
      var listofUsers = []
      for(var i=0;i<data.length;i++){
        if(data[i].username===user)
           {
            fetch('http://localhost:8102/api/blockFriend', {
                method: 'post',
                headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
                body: JSON.stringify({
                  fromEmailId:localStorage.getItem("emailId"),
                  toEmailId:data[i].emailId,
                })})
                .then((response)=> {
                  return response.json();
                }).then((data)=>{
                  console.log("Blocked")
                })
           }
      } 
    })
}


  addListeners = currentUserUid => {
    let loadedUsers = [];
    var url = 'http://localhost:8102/api/getRequests?user='+localStorage.getItem('emailId');
    fetch(url, {
      method: 'get',
      headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'},
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
      } // this will be a string
      this.setState({users:listofUsers})
    });
}
        });
  }



  render() {
    const { activeIndex, privateChannel, channel, users } = this.state;

    if (privateChannel) return null;

    return (
      <div className="largefriends">
      <Segment className="friends">
         <Header as="h3" attached="top">
          Connection Requests
          {/* <Input
            loading={false}
            onChange={this.searchUsers}
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Find a friend"
          /> */}
        </Header> 
        <Menu.Menu className="menu textSize">
        <Menu.Item>
          <span>
            <Icon name="users" /> 
          </span>{" "}
          ({users.length})
        </Menu.Item>
        {users.map(user => (
          <Menu.Item
            key={user}
            style={{ opacity: 1.0, fontStyle: "italic", fontSize: 16}}
          >
          <div>
            <Icon
              name="circle"
              color="green"
            />
            <Tooltip title="Would like to connect">
  <Button className="BigButton">{user}</Button>
</Tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button className="AlignRight"
            onClick={() => this.addFriend(user)}
            color="black"
            content="add"
            icon="add"
            style={{ width: 90, marginBottom: 3, height:35 }}>
            </Button>
            <Button
             onClick={() => this.blockFriend(user)}
            color="red"
            content="Ignore"
            style={{ width: 90, marginBottom: 3, height:35 }}>
            </Button>

            
            </div>
          </Menu.Item>
          
        ))}
      </Menu.Menu>
       
      </Segment>
      </div>
    );
  }
}

export default AcceptBlock;
