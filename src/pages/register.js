import React from 'react';
import axios from 'axios';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import { URL } from "../constants";

export default class Register extends React.Component {
	
	initialState = {id:'',name:'',mail:'', password:''};
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onChange(event) {
		this.setState({
			[event.target.name]:event.target.value
		});
	}
	
	onSubmit(event) {
		event.preventDefault();
		
		const user = {
			rollNumber: this.state.id,
			username:this.state.name,
			email: this.state.mail,
			password: this.state.password
        }
        console.log(user);
		
		axios.post(URL+"loginData/create/", user)
		.then(response => {
				ToastsStore.success("Successfully Registered");
				this.reset();
				this.props.history.push('/');			// redirecting to login page on success
		})
		.catch(error =>{ ToastsStore.error("Please enter valid details");});
	}
	
	reset = () => {
		this.setState(() => this.initialState);
	}
	login = () => {
		this.props.history.push('/');
	}
	
	render() {
		
		return(
		<div>
			<ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore}/>
			<div class="login-page">
			<Card className={"border border-dark bg-dark text-white"}>
			<Card.Header> <h5>STUDENT COLLABORATION PORTAL</h5><br/>
				Register </Card.Header>
			
			<Form id="FormId" onSubmit={this.onSubmit} onReset={this.reset}>
			<Card.Body>
			  	   <Form.Group as={Col} controlId="formGrid">
					    <Form.Control required autoComplete="off"
					    	type="text" name="id"
					    	value={this.state.id}
					    	onChange={this.onChange}
					    	placeholder="Roll Number" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
					<Form.Group as={Col} controlId="formGrid">
						    <Form.Control required autoComplete="off"
						    	type="password" name="password"
						    	value={this.state.password}
						    	onChange={this.onChange}
						    	placeholder="Password" 
						    	className={"bg-dark text-white"}/>
					  </Form.Group>					    
				  	<Form.Group as={Col} controlId="formGrid">
					    <Form.Control required autoComplete="off"
					    	type="text" name="name"
					    	value={this.state.name}
					    	onChange={this.onChange}
					    	placeholder="User Name" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
				  <Form.Group as={Col} controlId="formGrid">
				      <Form.Control required autoComplete="off"
				      	type="email" name="mail"
				      	value={this.state.mail}
				    	onChange={this.onChange}
				      	placeholder="Mail id"
				      	className={"bg-dark text-white"}/>
				   </Form.Group>
				   <Button size="sm" variant="success" type="submit">Register</Button>
			    {' '}
			    <Button size="sm" variant="info" type="reset">
			    <FontAwesomeIcon icon={faUndo}/> Reset
			  </Button>
			</Card.Body>
				<span style={{color:"grey"}}>Already a user?{' '}</span>
			    		<a href="/" style={{color:"white"}}>Login</a><br/><br/>
			</Form>
			</Card>
			</div>
		</div>
		
		);
	}
}
