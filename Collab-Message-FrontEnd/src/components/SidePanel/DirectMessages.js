import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setCurrentChannel, setPrivateChannel, setMessages } from "../../actions";
import { Menu, Icon } from "semantic-ui-react";
import { throws } from "assert";

class DirectMessages extends React.Component {

  constructor(props) {
    super(props);
  this.state = {
    activeChannel: "",
    user: this.props.currentUser,
    users: [],
    usersRef: firebase.database().ref("users"),
    connectedRef: firebase.database().ref(".info/connected"),
    presenceRef: firebase.database().ref("presence")
  };

}

  componentDidMount() {
    console.log("BC")
    if (this.state.user) {
      console.log("USERNAMEEEEy",this.state.user)
      this.addListeners(this.state.user.username);
    }
  }

  addListeners = currentUserUid => {
    let loadedUsers = [];
    console.log("inside friends = ",this.state.user)
    var url = 'http://localhost:8102/api/getFriends?user='+localStorage.getItem("emailId");
    fetch(url, {
      method: 'get'
    })
    .then((response)=> {
      return response.json();
    }).then((data)=>{
      var listofEmails = []
      if(data!=null && data.length>=1)
      {
      var obj = JSON.parse(data[0])
      console.log("ANSWR",data[0])

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
    for(var i=0;i<data.length;i++){
      if(listofEmails.includes(data[i].emailId))
          listofUsers.push(data[i].username)
    } // this will be a string
    this.setState({users:listofUsers})
  });
}
})
}

  /*  this.state.usersRef.on("child_added", snap => {
      if (currentUserUid !== snap.key) {
        let user = snap.val();
        user["uid"] = snap.key;
        user["status"] = "offline";
        loadedUsers.push(user);
        this.setState({ users: loadedUsers });
      }
    });

  /* == this.state.connectedRef.on("value", snap => {
      if (snap.val() === true) {
        const ref = this.state.presenceRef.child(currentUserUid);
        ref.set(true);
        ref.onDisconnect().remove(err => {
          if (err !== null) {
            console.error(err);
          }
        });
      }
    });
    this.state.presenceRef.on("child_added", snap => {
      if (currentUserUid !== snap.key) {
        this.addStatusToUser(snap.key);
      }
    });

    this.state.presenceRef.on("child_removed", snap => {
      if (currentUserUid !== snap.key) {
        this.addStatusToUser(snap.key, false);
      }
    });
    */
  //};

  addStatusToUser = (userId, connected = true) => {
    const updatedUsers = this.state.users.reduce((acc, user) => {
      if (user.uid === userId) {
        user["status"] = `${connected ? "online" : "offline"}`;
      }
      return acc.concat(user);
    }, []);
    this.setState({ users: updatedUsers });
  };

  isUserOnline = user => user.status === "online";

  changeChannel = user => {
    
    console.log("changeChannel = " + JSON.stringify(user))
    const channelId = this.getChannelId(user);
    const channelData = {
      id: channelId,
      name: user
    };

    this.props.setCurrentChannel(channelData);
    this.props.setPrivateChannel(true);
    this.setActiveChannel(user);
    localStorage.setItem("TEST",user);
    localStorage.setItem("TYPE","DM")
    console.log("ACTIVE CHANNEL",user);
    this.props.setMessages([])

    var url = 'http://localhost:8080/api/getdm?sender='+localStorage.getItem('username')+'&&receiver='+user;
      fetch(url, {
        method: 'get',
      })
     .then(Response => {
      Response.json()
      .then(message => {
      console.log("VALUE"+message)
      this.props.setMessages(message)
      })
    })

  };

  getChannelId = userId => {
    const currentUserId = this.state.user.username
    console.log("currentUserId = " + JSON.stringify(this.state.user))
    return userId < currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };

  setActiveChannel = userId => {
    localStorage.setItem("TYPE","DM")
    this.setState({ activeChannel: userId });
  };

  render() {
    const { users, activeChannel } = this.state;

    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="mail" /> DIRECT MESSAGES
          </span>{" "}
          ({users.length})
        </Menu.Item>
        {users.map(user => (
          <Menu.Item
            key={user}
            active={user === activeChannel}
            onClick={() => this.changeChannel(user)}
            style={{ opacity: 0.7, fontStyle: "italic" }}
          >
            <Icon
              name="circle"
              color={this.isUserOnline(user) ? "green" : "red"}
            />
            @ {user}
          </Menu.Item>
        ))}
      </Menu.Menu>
    );
  }
}

export default connect(
  null,
  { setCurrentChannel, setPrivateChannel, setMessages }
)(DirectMessages);
