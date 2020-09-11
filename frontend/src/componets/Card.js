import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { connect } from 'react-redux';

class Cards extends Component {

    render() {
        console.log("user--", this);
        const { user } = this.props;
        return (
            <div className="card">
                <div className="a1">
                    <Link to={'/profile/' + user._id}>
                    <span className="name">{user.name}</span>
                    </Link>
                    <div className="price">{user.email} </div>
                    <button onClick={() => { this.handleClick(user._id) }} className='btn-small waves-effect lighten-2 delete'>Delete</button>
                </div>
            </div>
        )
    }
}

export default connect(null)(Cards);