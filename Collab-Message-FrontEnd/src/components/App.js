import React from "react";
import { Grid } from "semantic-ui-react";
import "./App.css";
import { connect } from "react-redux";

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import AcceptBlock from "./MetaPanel/AcceptBlock";
import ChannelRequest from  "./MetaPanel/ChannelRequest";

const App = ({ currentUser, currentChannel, isPrivateChannel, allmessages }) => (
  <Grid columns="equal" className="app" style={{ background: "#FFF" }} style={{height: '100vh'}}>
    {/*<ColorPanel />*/}
    <SidePanel key={currentUser && currentUser.uid} currentUser={localStorage.getItem("username")} />
    <Grid.Column style={{ marginLeft: 320 }} width={6}>
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={localStorage.getItem("username")} 
        isPrivateChannel={isPrivateChannel}
        allmessages={allmessages}
      />
    </Grid.Column>

    <Grid.Column width={4} > 
    <MetaPanel 
        currentUser={localStorage.getItem("username")}
        />

     <AcceptBlock
        currentUser={localStorage.getItem("username")}
    />
   </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  allmessages : state.messages.allmessages
});

export default connect(mapStateToProps)(App);
