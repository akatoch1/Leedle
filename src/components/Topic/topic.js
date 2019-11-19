import React, { Component } from 'react';
import { FirebaseContext } from '../Firebase';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Topic = (props) => (
    <div>
        <FirebaseContext.Consumer>
          {firebase => <TopicPage firebase={firebase} user={props.user}/>}
        </FirebaseContext.Consumer>
    </div>
    );

const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 10,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
});

const INITIAL_STATE = {
    topic: '', 
    clicked: false
    };
class TopicPage extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        event.preventDefault();
        const {topic} = this.state;
        let thedb = this.props.firebase.db;
        thedb.ref("/topics/" + this.props.user.displayName).push(topic);
        this.setState({clicked: false});
    }
    onClick = event => {
        event.preventDefault();
        this.setState({clicked: true})
        //thedb.ref("/users").child(email).set(password); writing to database
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const {
            topic,
            clicked
        } = this.state;
        
        if (clicked == true) {
            return (
            <form onSubmit={this.onSubmit}>
            <TextField
            id = "outlined-multiline-static"
            name="topic"
            align = "middle"
            value={topic}
            onChange={this.onChange}
            type="text"
            placeholder="Topic"
            />
            <div id = "post">
            <button type = "submit">Post</button>
            </div>
            </form>);
        }
        else {
            return (
                this.props.user?
                <div id = "create">
                <MyButton type = "submit" onClick = {this.onClick}>Create</MyButton>
                </div>
                :
                null
            );
        }
    }
}

export default Topic;