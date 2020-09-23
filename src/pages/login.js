import React from 'react';
import axios from 'axios';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import {Redirect} from 'react-router-dom';
import { URL } from "../constants";

export default class Login extends React.Component {
	
	initialState = {id:'',password:''};
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.state.show = false;
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	  
	onSubmit(event) {
		event.preventDefault();
		
		const user = {
			rollNumber: this.state.id,
			password:this.state.password,
        }
		
		axios.post(URL+"token-auth/", user)
		.then(response => {
			console.log(response.data);
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user', response.data.user.username);
			localStorage.setItem('role', response.data.user.role);
			this.props.history.push('/welcome');
		})
		.catch(error => {
			console.log(error);
			ToastsStore.error("please fill valid details");
                this.reset();});

	}
	
	register =() =>{
		this.props.history.push('/register');
	}
	
	reset = () => {
		this.setState(() => this.initialState);
	}

	onChange(event) {
		this.setState({
			[event.target.name]:event.target.value
		});
	}
	render() {
		const {id, password} = this.state;
		return(
			
		<div>
			<ToastsContainer position={ToastsContainerPosition.TOP_CENTER} store={ToastsStore}/>
			<Card className={"border border-dark bg-dark text-white"}>
			<Card.Header> <h3>STUDENT COLLABORATION PORTAL</h3><br/>
			Login </Card.Header>
			
			<Form id="FormId" onSubmit={this.onSubmit} onReset={this.reset}>
			<Card.Body>
			  	<Form.Row>
				  	<Form.Group as={Col} controlId="formGrid">
				  		<Form.Label>User Id</Form.Label>
					    <Form.Control required autoComplete="off"
					    	type="text" name="id"
					    	value={id}
					    	onChange={this.onChange}
					    	placeholder="Enter Roll Number" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
				  <Form.Group as={Col} controlId="formGrid">
				      	<Form.Label>Password</Form.Label>
				      <Form.Control required autoComplete="off"
				      	type="password" name="password"
				      	value={password}
				    	onChange={this.onChange}
				      	placeholder="Enter password"
				      	className={"bg-dark text-white"}/>
				   </Form.Group>
			  	</Form.Row>
			</Card.Body>
			<Card.Footer style={{"textAlign":"right"}}>
			 <Button size="sm" variant="success" type="submit">
			    <FontAwesomeIcon icon={faSave}/> Submit
			  </Button>
			    {' '}
			    <Button size="sm" variant="info" type="reset">
			    <FontAwesomeIcon icon={faUndo}/> Reset
			  </Button>
			    
			    <br/><br/>
			    <span> Not a user? {' '}
			    		<Button size="sm" variant="secondary" onClick={this.register}>Register</Button>
			    </span>
			</Card.Footer>
			</Form>
			</Card>
			
		</div>
		);
	}
}
