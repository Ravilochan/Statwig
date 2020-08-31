import React from "react";
import { Menu, Button } from "semantic-ui-react";

import UserPanel from "./UserPanel";
import Channels from "./Channels";
import PrivateChannels from "./PrivateChannels";
import DirectMessages from "./DirectMessages";
import Starred from "./Starred";

class SidePanel extends React.Component {
  render() {
    const { currentUser } = this.props;
    console.log("CURR USER = ", currentUser)
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#0B5394", fontSize: "1.2rem" }}
      >
        <UserPanel currentUser={currentUser} />
        <Channels currentUser={currentUser} />
        <PrivateChannels currentUser={currentUser} />
        <DirectMessages currentUser={currentUser} />
      </Menu>
    );
  }
}

export default SidePanel;
