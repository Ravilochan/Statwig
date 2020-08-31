import React,{ Component } from "react";
import {Container,Row,Col,Card,CardBody,Button} from 'mdbreact';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


class IdeaGenre extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    
    handleChange = (event) => {
        this.props.handleIdeaType(event.target.value)
    }
    

    render(){
        return(
            <div>
                <div class="shadowingcontainer padbot">
                <Container>
                <section className="form-elegant" style={{"margin-top":"5%"}}>
                    <h1 style={{"margin-left":"10%"}}>Describe your idea type</h1>
                    <Row >
                    <Col md="8" className="mx-auto"r>
                        <Card>
                            <CardBody className="mx-4">
                                <FormControl component="fieldset" style={{"margin-left":"20px","width":"95%","fontSize":15}}>
                                <RadioGroup aria-label="ideaType" name="ideaType" onChange={this.handleChange} >
                                <FormControlLabel value="LOCKED_IDEA" control={<Radio />} label="Locked Idea" />
                                <p>Locked Idea indicates that the content will not be visible to other users.Only a brief description and keywords of the idea would be visible</p>
                                <FormControlLabel value="OPEN_IDEA" control={<Radio />} label="Open Idea" />
                                <p>Open Idea indicates that the content will be visible to other users. </p>
                                </RadioGroup>
                                </FormControl>
                            </CardBody>
                        </Card>
                        <br/>
                        <br/>
                
                    </Col>

                    
                    </Row>
                  

                </section>
                <Row>
                    <Button style={{"margin-left":"20px","width":"95%","fontSize":15}}>POST IDEA!</Button>  
                </Row>
                </Container>
                </div>
            </div>
        )
    }
}

export default IdeaGenre