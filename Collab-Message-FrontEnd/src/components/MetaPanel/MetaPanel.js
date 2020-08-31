import React from "react";
import { Segment, Accordion, Header, Image, Button,Input } from "semantic-ui-react";
import Tooltip from '@material-ui/core/Tooltip';
import { Menu, Icon } from "semantic-ui-react";
import SweetAlert from 'sweetalert-react';
var dict = {};
class MetaPanel extends React.Component {
  state = {
    username:this.props.currentUser,
    users: [],
  };

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

  findFriends(user){
      console.log(user)
    fetch('http://localhost:8102/api/sendRequest', {
        method: 'post',
        headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify({
          fromEmailId:localStorage.getItem("emailId"),
          toEmailId:user.emailId,
        })})
        .then((response)=> {
          return response.json();
        }).then((data)=>{
          console.log("SENT")
        })
        window.location.reload(true)
      }
  

  addListeners = currentUserUid => {
    let loadedUsers = {};
    var url = 'http://localhost:8102/api/getSuggestions?user='+localStorage.getItem('emailId');
    fetch(url, {
      method: 'get',
      headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'},
    })
    .then((response)=> {
      return response.json();
    }).then((data)=>{
      var listofUsers = []
      for(var i=0;i<data.length;i++){
        listofUsers.push({username:data[i].username,emailId:data[i].emailId, interests:data[i].li})
        var xxx=[]
        for(var j=0;j<data[i].li.length;j++)
        {
          console.log(data[i].li[j].prefName+" - ")
          xxx.push(data[i].li[j].prefName+" - ")
        }
        dict[data[i].username]=xxx
      } // this will be a string
      this.setState({users:listofUsers})
      console.log("NEW = ",this.state.users)
    });
}



  render() {
    const { activeIndex, privateChannel, channel,users } = this.state;

    if (privateChannel) return null;
    

    return (
      <div className="largefriends">
      <Segment className="friends">
         <Header as="h3" attached="top">
         Suggestions
          {/* <Input
            loading={false}
            onChange={this.searchUsers}
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Find a friend"
          /> */}
        </Header>
        <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="users" /> 
          </span>{" "}
          ({users.length})
        </Menu.Item>
        {users.map((user =>
         <Menu.Item
            key={user.username}
            style={{ opacity: 1.0, fontStyle: "italic", fontSize: 16, marginBottom:2}}
          >
          <div>
            <Icon
              name="circle"
              color="green"
            />
<Tooltip title={dict[user.username]}>
  <Button className="BigButton">{user.username}</Button>
</Tooltip>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<Button className="AlignRight"
            onClick={() => this.findFriends(user)}
            color="blue"
            content="connect"
            style={{ width: 100, marginBottom: 2, height:35}}>
            </Button>
            <Button
            onClick={() => this.findFriends(user)}
            color="red"
            content="Ignore"
            style={{ width: 100, marginBottom: 2, height:35}}>
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

export default MetaPanel;
