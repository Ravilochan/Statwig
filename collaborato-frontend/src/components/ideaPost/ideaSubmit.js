import React,{ Component } from "react";
import {Container,Row,Col,Card,CardBody,Button} from 'mdbreact';
import { throws } from "assert";


class IdeaSubmit extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    submitIdea = ()=>{
        this.props.handleSubmitIdea()
    }
    render(){
        return(
            <div>
                <div class="shadowingcontainer padbot">
                <Container>
                <section className="form-elegant" style={{"margin-top":"5%"}}>
                    <h1 style={{"margin-left":"7%"}}>Idea Summary</h1>
                    <Row >
                    <Col md="8" className="mx-auto"r>
                        <Card>
                            <CardBody className="mx-4">
                             <p>Idea Headline : {this.props.Headline}</p>
                             <p>Idea Description : {this.props.IdeaDescription}</p>
                             <p>Idea Field : {this.props.IdeaField}</p>
                             <p>Idea Type : {this.props.IdeaType}</p>
                             <p>Idea Genre : {this.props.IdeaGenre}</p>


                            </CardBody>
                        </Card>
                        <br/>
                        <br/>
                
                    </Col>

                    
                    </Row>
                  

                </section>
                <Row>
                    <Button style={{"margin-left":"20px","width":"95%","fontSize":15}} onClick={this.submitIdea}>POST IDEA!</Button>  
                </Row>
                </Container>
                </div>
            </div>
        )
            
    }
       
}


export default IdeaSubmit
