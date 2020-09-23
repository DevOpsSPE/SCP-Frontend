import React, { Component } from 'react';
import axios from 'axios';
import  {Table} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'
import {Card, Button,ButtonGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faTrash,faList} from '@fortawesome/free-solid-svg-icons';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import {Redirect} from 'react-router-dom';
import { URL } from "../constants";

class adminVerify extends Component {
	constructor(props) {
            super(props);
            this.state={
                data:[],load:true,role:''
        };
    }
    
    async componentDidMount(){

        var id=this.props.match.params.id;
        var url="";
        (id==1)?(url=URL+"pyq/admin/"):(id==2)?(url=URL+"interviewData/admin/"):(url=URL+"video/admin/");
        console.log(url);

        await axios.get(url,{headers: {
            'Authorization': `JWT ${localStorage.getItem('token')}`
        }})
        .then(Response =>{
            var verified =  Response.data.filter(function(tuple) {
                return tuple.verified ==false;
              });
              this.setState({data:verified});
              this.setState({load:false});
        })
        .catch(Response => {
            console.log(Response.message);
            ToastsStore.error("You are Unauthorized to view this");
            return <Redirect to ="/welcome" /> ;
        })
    }

    delete = (id) => {
        var parid=this.props.match.params.id;
        var url="";
        (parid==1)?(url=URL+"deleteData/"):(parid==2)?(url=URL+"interviewData/"):(url=URL+"deleteVideoData/");
        url += id+"/";
		axios.delete(url,{headers: {
            'Authorization': `JWT ${localStorage.getItem('token')}`
        }})
		.then(response => {
			if (response.data != null) {
				this.setState({
					data: this.state.data.filter(data => data.id !== id)
                });
                ToastsStore.error("Successfully deleted");
            }
            else{
                alert("not deleted");
            }
		});
    }
    
    patch = (id,ver) => {
        var parid=this.props.match.params.id;
        var url="";
        (parid==1)?(url=URL+"getData/"):(parid==2)?(url=URL+"interviewData/"):(url=URL+"updateVideoData/");
        url += id+"/";
        const data={
            verified: ver,
          }
          const config = {
            headers: {
                'content-type': 'application/json',
                'authorization': `JWT ${localStorage.getItem('token')}`
            }
        }
        axios.patch(url,data,config)
        .then(Response => {
            this.setState({
                data: this.state.data.filter(data => data.id !== id)
            });
            ToastsStore.success("Successfully Verified");
        })
        .catch(e => console.log("error"))
    }

    fileDownload = () => {
        var id=this.props.match.params.id;
        var url="";
        (id==1)?(url="/readOnePYQ/"):(id==2)?(url="/readOneExp/"):(url="/playVideo/");

        var module="";
        (id==1)?(module="Previous Year Questions"):(id==2)?(module="Interview Experiences"):(module="Video Resources");
  
         return(
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
				<Card.Header><FontAwesomeIcon icon={faList}/>  {module}  </Card.Header>
				<Card.Body>
				
				<Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>LINK</th>
                            <th>VERIFY</th>
                        </tr>
                        {this.state.data.length <= 0 ?this.state.load?(<tr>
                                        <td colSpan="6" align="center">
                                            <b>Loading...</b>
                                        </td>
                                        </tr>):(<tr>
                                        <td colSpan="6" align="center">
                                            <b>There is no data yet</b>
                                        </td>
                                        </tr>):
                                    this.state.data.map((e) =>
                                    (
                                        <tr key={e.id}>
                                            <td>{e.id}</td>
                                            <td><a href={url+e.id} className={"text-white"} target="_blank"><b> Link </b></a>
                                            </td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button size='sm' variant="outline-success" onClick={this.patch.bind(this, e.id,true)}><FontAwesomeIcon icon={faSave}/></Button>
                                                    <Button size='sm' variant="outline-danger" onClick={this.delete.bind(this, e.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>))}
                        </thead>
                    </Table>
                    </Card.Body>
			</Card>
            </div>
          );
      }

	render() {
        if(localStorage.getItem("role")==="Student")
        {
            ToastsStore.error("You are Unauthorized to view this");
            return <Redirect to="/welcome"></Redirect>;
        }

		return(
		<div>
            <NavigationBar/>
            <ToastsContainer position={ToastsContainerPosition.TOP_CENTER} store={ToastsStore}/>
			    {this.fileDownload()}
		</div>
		);
	}
}

export default adminVerify;
