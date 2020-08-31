import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setCurrentChannel, setPrivateChannel, setMessages } from "../../actions";
import Tooltip from '@material-ui/core/Tooltip';
// prettier-ignore
import { Menu, Icon, Modal, Form, Input, Button, Label } from "semantic-ui-react";
var dict = {};
var listofEmails=[];
class PrivateChannels extends React.Component {
  state = {
    activeChannel: "",
    user: this.props.currentUser,
    channel: null,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref("channels"),
    messagesRef: firebase.database().ref("messages"),
    notifications: [],
    modal: false,
    firstLoad: true,
    messages: this.props.allmessages,
    users: [],   
    userObject:[],
    requestList:[],
    privateChannelUsers:{},
    privateChannelAddRequest:["'" + localStorage.getItem("emailId") + "'"]
  };

  componentDidMount() {
    this.addListeners();
    var url='http://localhost:8080/api/getprivatechannels?user='+localStorage.getItem('emailId')
    fetch(url, {
        method: 'get'
      })
     .then(Response => {
      Response.json().then(channelList => {
      let loadedChannels = [];      
      this.setState({channels:channelList});
      console.log("PRIVATE CHANNESLS LIST = " ,channelList[0].users)
      })
    })


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

  // setFirstChannel = () => {
  //   console.log("FIRSTCHANNEL= ", this.state.channels)
  //   const firstChannel = this.state.channels[0].channelname;

  //   if (this.state.firstLoad && this.state.channels.length > 0) {
  //     this.props.setCurrentChannel(firstChannel);
  //     this.setActiveChannel(firstChannel);
  //     this.setState({ channel: firstChannel });
  //   }
  //   this.setState({ firstLoad: false });

  // };

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
   /* this.state.channelsRef.on("child_added", snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
      this.addNotificationListener(snap.key);
    });*/
  };

  addNotificationListener = channelId => {
    this.state.messagesRef.child(channelId).on("value", snap => {
      if (this.state.channel) {
        this.handleNotifications(
          channelId,
          this.state.channel.id,
          this.state.notifications,
          snap
        );
      }
    });
  };

  handleNotifications = (channelId, currentChannelId, notifications, snap) => {
    let lastTotal = 0;

    let index = notifications.findIndex(
      notification => notification.id === channelId
    );

    if (index !== -1) {
      if (channelId !== currentChannelId) {
        lastTotal = notifications[index].total;

        if (snap.numChildren() - lastTotal > 0) {
          notifications[index].count = snap.numChildren() - lastTotal;
        }
      }
      notifications[index].lastKnownTotal = snap.numChildren();
    } else {
      notifications.push({
        id: channelId,
        total: snap.numChildren(),
        lastKnownTotal: snap.numChildren(),
        count: 0
      });
    }

    this.setState({ notifications });
  };

  removeListeners = () => {
    this.state.channelsRef.off();
  };

  setFirstChannel = () => {
    console.log("FIRSTCHANNEL= ", this.state.channels)
    const firstChannel = this.state.channels[0].channelname;

    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
      this.setState({ channel: firstChannel });
    }
    this.setState({ firstLoad: false });

  };

  addChannel = () => {
    const { channelName,privateChannelAddRequest} = this.state;
   // const key = channelsRef.push().key
  //  var url = "http://localhost:8080/api/addprivatechannel?channelname="+ channelName
  //  console.log(url)
  //   fetch(url, {
  //       method: 'post',
  //       headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
  //       credentials:'include',
  //     })
  //      .then(Response => {
  //       this.setState({ channelName: "", channelDetails: "" });
  //       this.closeModal();
  //       console.log(Response.json());
  //       var url='http://localhost:8080/api/getprivatechannels'
  //       fetch(url, {
  //         method: 'get',
  //         credentials : 'include',
  //       })
  //      .then(Response => {
  //       Response.json().then(channelList => {
  //       let loadedChannels = [];      
  //       this.setState({channels:channelList},() => this.setFirstChannel());
  //       console.log("LIST = " ,channelList)
  //       })
  //     })
  // });

  

}

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeChannel = channel => {
    console.log("CHANGECHANNEL =", channel)
    const channelData = {
      id: channel.channelid,
      name: channel.channelname
    };

    this.setActiveChannel(channel.channelname);
    this.clearNotifications();
    this.props.setCurrentChannel(channelData);
    this.props.setPrivateChannel(false);
    this.setState({channel : channelData});
    localStorage.setItem("CURRENTCHANNEL",channel.channelname);
    console.log("CAPTURE CHANNLE=", this.props.allmessages)
    localStorage.setItem("TYPE","PCM")

    this.props.setMessages([])

    var url = 'http://localhost:8080/api/getmessages?channel=' + localStorage.getItem("CURRENTCHANNEL")
    fetch(url, {
      method: 'get',
      credentials : 'include',
    })
   .then(Response => {
    Response.json()
    .then(message => {
    console.log("VALUE"+message)
    this.props.setMessages(message)
    })
  })

};


  clearNotifications = () => {
    let index = this.state.notifications.findIndex(
      notification => notification.id === this.state.channel.id
    );

    if (index !== -1) {
      let updatedNotifications = [...this.state.notifications];
      updatedNotifications[index].total = this.state.notifications[
        index
      ].lastKnownTotal;
      updatedNotifications[index].count = 0;
      this.setState({ notifications: updatedNotifications });
    }
  };

  setActiveChannel = channel => {
    localStorage.setItem("TYPE","PCM")
    this.setState({ activeChannel: channel });
  };

  getNotificationCount = channel => {
    let count = 0;

    this.state.notifications.forEach(notification => {
      if (notification.id === channel.id) {
        count = notification.count;
      }
    });

    if (count > 0) return count;
  };

  handleSubmit= (privateChannelAddRequest) => {
    fetch('http://localhost:8080/api/addtoprivate', {
    method: 'post',
    headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify({
      channelName:this.state.channelName,
      participants:privateChannelAddRequest   
    })})
    .then(Response => {
         this.setState({ channelName: "", channelDetails: "" });
         this.setState({privateChannelAddRequest:["'" + localStorage.getItem("emailId") + "'"]})
         this.closeModal();
         console.log(Response.json());

         var url='http://localhost:8080/api/getprivatechannels?user='+localStorage.getItem('emailId')
         fetch(url, {
             method: 'get'
           })
          .then(Response => {
           Response.json().then(channelList => {
           let loadedChannels = [];      
           this.setState({channels:channelList});
           console.log("PRIVATE CHANNESLS LIST = " ,channelList[0].users)
           })
         })
       })
 
  //   fetch('http://localhost:8080/api/addtoprivate', {
  //   method: 'post',
  //   headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
  //   body: JSON.stringify({
  //     channelName:this.state.channelName,
  //     participants:privateChannelAddRequest   
  //   })})
  //   .then((response)=> {
  //     return response.json();
  //   }).then((data)=>{
  //     console.log("SENT")
  //   })
  //  // this.addChannel();

    //console.log("Adding this guy" + privateChannelAddRequest)
  }


  sendPrivateChannelRequest(user){
    var x=this.state.privateChannelAddRequest
    x.push("'"+user.emailId+"'")
    console.log("Adding ",user.emailId)
    this.setState({privateChannelAddRequest:x})
    console.log("TOTAL", this.state.privateChannelAddRequest.length)
  }


  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel.channelid}
        onClick={() => this.changeChannel(channel)}
        name={channel.channelname}
        style={{ opacity: 0.7 }}
        active={channel.channelname === this.state.activeChannel}
      >
        {this.getNotificationCount(channel) && (
          <Label color="red">{this.getNotificationCount(channel)}</Label>
        )}
        # {channel.channelname}
      </Menu.Item>
    ));

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });


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
    }



  render() {
    const { channels, modal,users,userObject,requestList,privateChannelAddRequest } = this.state;
  

    return (
      <React.Fragment>
        <Menu.Menu className="menu">
          <Menu.Item>
            <span>
              <Icon name="exchange" />PRIVATECHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/* Add Channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Private Channel</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
              <Menu.Menu className="menu">
        <span>
            <Icon name="users" /> 
          </span>{" "}
          ({users.length})
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
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { setCurrentChannel, setPrivateChannel, setMessages }
)(PrivateChannels);
