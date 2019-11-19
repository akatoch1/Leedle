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
            comments: [],
            comment: '',
            k: '',
            votes: 0
        }
    }

    componentDidMount() {
        
        let topicsRef = this.props.firebase.db.ref(this.props.topic);
        topicsRef.on("value", ss=>{
            let data = ss.val();
            if (data != null) {
                let topicIds = Object.keys(data);
                var comments = [];
            
            topicIds.map(u => {
                let topicsRef2 = this.props.firebase.db.ref(this.props.topic + "/" + u);
                topicsRef2.on("value", snapshot=> {
                    let d = snapshot.val();
                    let topicIds2 = Object.keys(d);
                    topicIds2.map(anId=>{
                        let topicsRef3 = this.props.firebase.db.ref(anId);
                        topicsRef3.on("value", ss1=> {
                            let d1 = ss1.val();
                            comments.push([u, d[anId], anId, d1]);
                            this.setState({comments: comments});
                        })
                        
                        
                    });
                    
                    
                }
                )
                
            }
            )
            
            }
        });
    }

    upVote = (t) => {
        let thedb = this.props.firebase.db.ref(t);
        const saveState = {};
        thedb.on("value", ss=>{
            let data = ss.val();
            let num = data + 1;
            saveState.key = num;
            
        });
        thedb.set(saveState.key);
    } 

    downVote = (t) => {
        let thedb = this.props.firebase.db.ref(t);  
        const saveState = {};
        thedb.on("value", ss=>{
            let data = ss.val();
            let num = data - 1;
            saveState.key = num;
            
        })
        thedb.set(saveState.key);
    }


    onSubmit = event => {
        event.preventDefault();
        const {comment} = this.state;
        let thedb = this.props.firebase.db;
        let key = thedb.ref(this.props.topic + "/" + this.props.user.displayName).push().getKey();
        thedb.ref(this.props.topic + "/" + this.props.user.displayName).child(key).set(comment);
        thedb.ref().child(key).set(0);
        this.setState({ comment: '' });
    }

    onChange = event => {
        if (event.target.value.length > 0) {
            this.setState({ [event.target.name]: event.target.value });
        }
    };

    render() {
        const {
            comment,
            votes
        } = this.state;
        
        return(
            this.props.user ?
            <form onSubmit={this.onSubmit}>
            <div id = "comment">
            {this.state.comments.map(topic=>{
                return (
                <div>
                <button onClick = {() => this.upVote(topic[2])}>Up</button>
                <button onClick = {() => this.downVote(topic[2])}>Down</button>
                <h1 id = {"comment"} key={topic}>{topic[0]}: {topic[1]}</h1> 
                <p id = "vote">{topic[3]}</p>
                </div>);
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
                return (
                <h1  key={topic}>{topic[0]}: {topic[1]}</h1>
                );
            })} 

            </div>
        )
    }

}

export default Channel