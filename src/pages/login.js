import React from 'react';
import axios from 'axios';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import { URL } from "../constants";

export default class Login extends React.Component {
	
	initialState = {id:'',password:'',role:'',adminkey:'',token:''};
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
			//console.log(response.data);
			localStorage.setItem('user', response.data.user.username);
			localStorage.setItem('role', response.data.user.role);
			this.setState({role:response.data.user.role});
			if(this.state.role=='Student'){
				localStorage.setItem('token', response.data.token);
				this.props.history.push('/welcome');
			}
			else{this.setState({token:response.data.token});}
		})
		.catch(error => {
			console.log(error);
			ToastsStore.error("please fill valid details");
                this.reset();});
	}
	
	reset = () => {
		this.setState(() => this.initialState);
	}

	adminSubmit = () => {
		var params={};
        params.adminkey=this.state.adminkey;
		
		axios.get(URL+"loginData/adminverify/",
		{params,headers: {
            'Authorization': `JWT ${this.state.token}`
        }}
		)
		.then(response => {
				localStorage.setItem('token', this.state.token);
				this.props.history.push('/welcome');
			})
		.catch(error => {
			console.log(error);
			ToastsStore.error("Invalid admin key");
				this.reset();
			});
	}

	onChange(event) {
		this.setState({
			[event.target.name]:event.target.value
		});
	}
	render() {
		const {id, password, adminkey} = this.state;
		return(
			
		<div>
			<ToastsContainer position={ToastsContainerPosition.TOP_CENTER} store={ToastsStore}/>
			<div class="login-page">
			<Card className={"border border-dark bg-dark text-white"}>
			<Card.Header> <h5>STUDENT COLLABORATION PORTAL</h5><br/>
			Login </Card.Header>
			
			<Form id="FormId" onSubmit={this.onSubmit} onReset={this.reset}>
			<Card.Body>
				  	<Form.Group as={Col} controlId="formGrid">
					    <Form.Control required autoComplete="off"
					    	type="text" name="id"
					    	value={id}
					    	onChange={this.onChange}
					    	placeholder="Roll Number" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
				  <Form.Group as={Col} controlId="formGrid">
				      <Form.Control required autoComplete="off"
				      	type="password" name="password"
				      	value={password}
				    	onChange={this.onChange}
				      	placeholder="Password"
				      	className={"bg-dark text-white"}/>
				   </Form.Group>
				   <Button size="sm" variant="success" type="submit">Login</Button>
				   {(this.state.role=="admin")?(<div><br/><Form.Group as={Col} controlId="formGrid">
				      <Form.Control required autoComplete="off"
				      	type="password" name="adminkey"
				      	value={adminkey}
				    	onChange={this.onChange}
				      	placeholder="Admin Key"
				      	className={"bg-dark text-white"}/>
				   </Form.Group>
				   <Button size="sm" variant="success" type="submit" onClick={this.adminSubmit}>Submit</Button>
				   </div>):''}
			</Card.Body>
			    <span style={{color:"grey"}}>Not a user? {' '}</span>
			    		<a href="/register" style={{color:"white"}}>Register</a><br/><br/>
			</Form>
			</Card>
			</div>
		</div>
		);
	}
}
