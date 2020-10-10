import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Welcome from './pages/Welcome'
import pyq from './pages/pyq'
import readOnePYQ from './pages/readOnePYQ'
import login from './pages/login'
import writeExp from './pages/writeExp'
import readExperiences from './pages/readExperiences'
import aboutus from './pages/aboutus'
import readOneExp from './pages/readOneExp'
import register from './pages/register'
import videoPage from './pages/videoPage'
import playVideo from './pages/playVideo'
import addVideo from './pages/addVideo'
import adminVerify from './pages/adminVerify'

import  {Col,Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./components/Home";

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route 
        {...props} 
        render={props => (
          localStorage.getItem('token') ?
            <Component {...props} /> :
            <Redirect to='/' />
        )}
      />
    )
  }
}

class App extends Component {
  state = { message: "" }
  callbackFunction = (childData) => {
        this.setState({message: childData})
  }

  render() {

    const marginTop={
      marginTop:"60px",
      alignItems:"center"
    }
    //{!localStorage.getItem('token') ? <Redirect from='/*' to='/' /> : ''}
    return (
      <Router basename="/react-auth-ui/">
        
        <Col lg={12} style={marginTop}>
          <Container>
          <Route exact path='/register' component={register}/>
            
            <Route exact path='/' component={login}/>
            <ProtectedRoute exact path='/pyq' component={pyq}/>
            <ProtectedRoute exact path='/readOnePYQ/:id' component={readOnePYQ}/>
            <ProtectedRoute exact path='/adminVerify/:id' component={adminVerify}/>
            <ProtectedRoute exact path='/videoPage' component={videoPage}/>
          </Container>
          
          <ProtectedRoute path='/welcome' component={Welcome}/>
          <ProtectedRoute exact path='/mockSchedule' component={Home}/>
            <ProtectedRoute exact path='/writeExp' component={writeExp} />
            <ProtectedRoute exact path='/readExperiences' component={readExperiences} />
            <ProtectedRoute exact path='/readOneExp/:id' component={readOneExp}/>
                        
            <ProtectedRoute exact path='/playVideo/:id' component={playVideo}/>
            <ProtectedRoute exact path='/addVideo' component={addVideo}/>
            <ProtectedRoute exact path='/aboutus' component={aboutus}/>
        </Col>
        
      </Router>
    )
  }
}

export default App
