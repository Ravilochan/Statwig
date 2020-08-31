import React,{ Component } from "react";
import "./ideaHeadline.css"
import { Container, Row, Col, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';


class IdeaHeadline extends Component{
    constructor(props) {
			super(props); 

  	 }
 
	onInputChange= (e) => {
		this.props.handleIdeaHeadline(e.target.value)
	}

	onIdeaDescription = (e) => {
		this.props.handleIdeaDescription(e.target.value)
	}
	render ()
	{
		
		return (
		<div class="shadowingcontainer padbot">
		<Container style={{"margin-top":"0%"}}>
       <h1 style={{"margin-left":"3%"}}>Describe your Idea/Product</h1>
        <section className="form-elegant" style={{"margin-top":"5%"}}>
          <Row >
            <Col md="8" className="mx-auto">
              <Card  class="cardshadow">
                <CardBody className="mx-4">
									<div class="form-group">
										<input type="text" class="form-control form-control-lg" id="headline" name="Headline" onChange={this.onInputChange} placeholder="Describe your idea in a single sentence" />
									</div>
									<div class="form-group">
										<textarea name="description" class="form-control form-control-lg" id="description" name="PropertyDescription" onChange={this.onIdeaDescription}
											placeholder="Describe your description in detail" rows="10" cols="50" />
									</div>
			 					</CardBody>     
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
      </div>
		);
	}

}

export default IdeaHeadline