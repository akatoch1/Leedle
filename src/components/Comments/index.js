import React, { Component } from 'react';
import { FirebaseContext } from '../Firebase';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Channel = (props) => (
    
    <div>
        <FirebaseContext.Consumer>
          {firebase => <Comments firebase={firebase} user={props.user} topic = {props.topic}/>}
        </FirebaseContext.Consumer>
    </div>
);

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            comments: [],
            comment: ''
        }
    }

    componentDidMount() {
        let topicsRef = this.props.firebase.db.ref(this.props.topic);
        topicsRef.on("value", ss=>{
            let data = ss.val();
            let topicIds = Object.keys(data);
            var comments = [];
            
            topicIds.map(u => {
                let topicsRef2 = this.props.firebase.db.ref(this.props.topic + "/" + u);
                topicsRef2.on("value", snapshot=> {
                    let d = snapshot.val();
                    let topicIds2 = Object.keys(d);
                    topicIds2.map(anId=>{
                        comments.push([u, d[anId]]);
                    });
                }
                )
            }
            )
            this.setState({comments: comments});
            //this.setState({users: users});
        });
    }

    onSubmit = event => {
        event.preventDefault();
        const {comment} = this.state;
        let thedb = this.props.firebase.db;
        thedb.ref(this.props.topic + "/" + this.props.user.displayName).push(comment);
        this.setState({ comment: '' });
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            comment
        } = this.state;
        return(
            this.props.user ?
            <form onSubmit={this.onSubmit}>
            <div id = "comment">
            {this.state.comments.map(topic=>{
                return (<h1  key={topic}>{topic[0]}: {topic[1]}</h1>);
            })} 
            <TextField
            id = "outlined-multiline-static"
            name="comment"
            align = "middle"
            value={comment}
            onChange={this.onChange}
            type="text"
            placeholder="Add a comment"
            />
            <button onClick = {this.onClick}>Add</button>
            </div>
            </form>
            :
            <div id = "comment">
            {this.state.comments.map(topic=>{
                return (<h1  key={topic}>{topic[0]}: {topic[1]}</h1>);
            })} 
            </div>
        )
    }

}

export default Channel