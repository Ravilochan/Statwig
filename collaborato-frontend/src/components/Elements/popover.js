import React,{ Component } from 'react';
import Popover, { ArrowContainer } from 'react-tiny-popover'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

class PopOver extends Component {
constructor() {
  super();
  this.state = { hover: false }
}
handleMouseIn() {
    this.setState({ hover: true })
  }

  handleMouseOut() {
    this.setState({ hover: false })
  }

  

  render() {
    const longText = localStorage.getItem('bio');
    const tooltipStyle = {
      display: this.state.hover ? 'block' : 'none',
      borderColor : 'black',
      border: '2px solid #ccd8e0',
      boxShadow: this.state.hover ? '1px 1px 3px rgba(0,0,0,0.25)': 'none'
    }

      return(
        <div>
        <div>
          <div style={tooltipStyle}>{longText}
          <Button variant="contained" color="secondary"> Follow </Button></div>
        </div>
      </div>
    )
  }

}


export default (PopOver);
