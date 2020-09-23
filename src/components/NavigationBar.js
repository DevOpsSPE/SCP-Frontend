import React from 'react';
import {Navbar,Nav, Button,NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

class NavigationBar extends React.Component{

  	  constructor(props) {
		    super(props);
        this.state = {logged_in: localStorage.getItem('token') ? true : false,
                      role: "",     
                };

		    this.logout = this.logout.bind(this);
      }

      componentDidMount() {
        
        if (this.state.logged_in) {
          Axios.get('http://localhost:8000/loginData/current_user/', {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
          })
          .then(res => {this.setState({
            role:res.data.role
          });
          console.log(this.state.role);
        })
        .catch(error => {
          ToastsStore.error("Unauthorized or token expired, please login again");
          localStorage.clear();
          return <Redirect to ='/'></Redirect> ;
          }
        );
        }
      }

    // redirecting to Login on clicking Logout
    logout=(event)=>{

      event.preventDefault();
      localStorage.clear();
    }

    admin(){
      if(this.state.role==="admin")
        {
          return(
            <NavDropdown title="Verify" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/adminVerify/1">Previous Year Questions</NavDropdown.Item>
                    <NavDropdown.Item href="/adminVerify/2">Interview Experiences</NavDropdown.Item>
                    <NavDropdown.Item href="/adminVerify/3">Video Resources</NavDropdown.Item>
            </NavDropdown>
          );
        }
    }

    welcome(){
      if(window.location.href.indexOf("welcome")<=-1)
         {
           return(<NavDropdown title="Menu" id="basic-nav-dropdown">
           <NavDropdown.Item href="/pyq/">Previous Year Questions</NavDropdown.Item>
           <NavDropdown.Item href="/readExperiences">Interview Experiences</NavDropdown.Item>
           <NavDropdown.Item href="/videoPage/">Video Resources</NavDropdown.Item>
           <NavDropdown.Item href="/mockSchedule/">Mock Interviews</NavDropdown.Item>
         </NavDropdown>);
         }
    }

  render(){
    /*if(!localStorage.getItem("user"))
    {
      alert("you have to log in");
      return <Redirect to="/"/> ;
    }*/
    
      return(
        <Navbar collapseOnSelect bg="dark" variant="dark" fixed="top" style={{height: '50px'}}>
          <ToastsContainer position={ToastsContainerPosition.TOP_CENTER} store={ToastsStore}/>
            <Navbar.Brand href="/welcome" >STUDENT COLLABORATION PORTAL</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                {this.admin()}
                {this.welcome()}  
                </Nav>

          <Nav pullright="true" className="ml-auto">
            <Button size="sm" variant="secondary" onClick={this.logout}><Link to="/">Logout</Link></Button>
          </Nav>
          </Navbar.Collapse>
        </Navbar>);
    
  }
}
export default NavigationBar;
