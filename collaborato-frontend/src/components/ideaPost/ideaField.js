import React,{ Component } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Input } from '@material-ui/core';
import { Container, Row, Col, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';



class IdeaField extends Component{
    constructor(props){
        super(props)
    }

    handleChange = (e) => {
        this.props.handleIdeaField(e.target.value)
    }

    handleIdeaGenre = (e) => {
        this.props.handleIdeaGenre(e.target.value)
    }
    
    render(){
        return(
            <div>
                <div class="shadowingcontainer padbot">
                <Container>
                <section className="form-elegant" style={{"margin-top":"5%"}}>

                    <h1 style={{"margin-left":"5%"}}>Describe the Field & Genre of your idea</h1>
                    <Row >
                    <Col md="8" className="mx-auto">
                      <Card>
                        <CardBody className="mx-4">
                            <InputLabel id="IdeaFieldLabel" style={{"margin-top": "10px","margin-left":"20px","width":"95%","fontSize":15}}>Idea Field</InputLabel>
                            <Select
                            labelId="IdeaFieldLabel"
                            id="IdeaField"
                            style={{"margin-left":"20px","width":"95%","fontSize":15}}
                            onChange={this.handleChange}
                            >
                                    <MenuItem value={"Healthcare"}>Healthcare</MenuItem>
                                    <MenuItem value={"Technology"}>Technology</MenuItem>
                                    <MenuItem value={"Movie"}>Movie</MenuItem>
                                    <MenuItem value={"Literature"}>Literature</MenuItem>
                                    <MenuItem value={"ArtificialIntelligence"}>Artificial Intelligence</MenuItem>
                                    <MenuItem value={"Engineering"}>Engineering</MenuItem>
                                    <MenuItem value={"Environment"}>Environment</MenuItem>
                                    <MenuItem value={"MedicalScience"}>Medical Science</MenuItem>
                            </Select>
                            <Input placeholder="Add Idea Genre" style={{"margin-left":"20px","width":"95%","fontSize":15}} id="idea_genre" onChange={this.handleIdeaGenre} ></Input>

                        </CardBody>     
                      </Card>
                    </Col>
                  </Row>














                    
                </section>
                </Container>
                </div>
            </div>
        )
    }
}

export default IdeaField