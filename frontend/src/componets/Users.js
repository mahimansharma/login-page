import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Card from './Card';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
                   };

    }

    handleClick = userId => {
        const requestOptions = {
            method: 'DELETE'
        };
        fetch("http://localhost:8000/api/users2/delete" + userId, requestOptions).then((response) => {
            return response.json();
        }).then((result) => {
            console.log(result)
        });
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/users2/allUsers`)
            .then(result => {
                console.log("got data", result)
                this.setState({
                    users: result.data
                })
            })
            .catch(error => {
                console.log("error", error)

            })
    }
    renderSpinner() {
        return (
            <div  >
                <span className="load">Loading.....</span>
                <Spinner type="grow" color="success" className="spinner00" />
            </div>

        )
    }

    renderUsers() {
        return (
            <div className="container-fluid">
                <Row className='bigrow'>
                    {this.state.users.map(user => {
                        return (
                            <Col className='collumns' xl={2} key={user.id}>
                                <Card
                                    user={user} 
                                    handleClick={this.handleClick}/>
                            </Col>
                        )
                    })}
                </Row>
            </div>

        )
    }
    renderHome() {
        return (
            this.state.users === undefined ? this.renderSpinner() : this.renderUsers()
        )
    }


    render() {
        console.log("Homedata", this);

        return this.renderHome();

    }
}

export default connect(null)(Users);