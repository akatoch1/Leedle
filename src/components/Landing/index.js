import React, { Component } from 'react';
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Link, Redirect } from 'react-router-dom';
import SignOut from '../SignOut';
import Topic from '../Topic/topic';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Channel from '../Comments'


const Landing = (props) => (
<div id="landing">
<FirebaseContext.Consumer>
      {firebase => <LandingDisplay firebase={firebase} user={props.user}/>}
</FirebaseContext.Consumer>

</div>
);

const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    top: '20px'
  });

class LandingDisplay extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            topics: [],
            users: [],
            click: false,
            chosen: ''
        };
        
    }
    

    onButtonClick = (t) => {
        this.setState({click: true});
        this.setState({chosen: t});
    }

    onHome = event => {
        this.setState({click: false});
    }

    componentDidMount() {
        let topicsRef = this.props.firebase.db.ref("/topics/");
        
        topicsRef.on("value", ss=>{
            let data = ss.val();
            if (data!=null) {
            let topicIds = Object.keys(data);
            let topics = [];
            topicIds.map(u => {
                let topicsRef2 = this.props.firebase.db.ref("topics/" + u);
                topicsRef2.on("value", snapshot=> {
                    let d = snapshot.val();
                    let topicIds2 = Object.keys(d);
                    topicIds2.map(anId=>{
                        topics.push([u, d[anId]]);
                    });
                }
                )
            }
            )
            this.setState({topics: topics});
            }
            
            //this.setState({users: users});
        })
        
    }
    
    render(){
        
        const {
            topics,
            click,
            users
        } = this.state;
        if (click == true) {
            return (
                this.props.user ?
                <div>
                <h1>Leedle</h1>
                <SignOut {...this.props} user={this.props.user}/>
                <button type = "submit" onClick = {this.onHome}>Home</button>
                <Channel {...this.props} user = {this.props.user} topic = {this.state.chosen}/> 
                </div>
                :
                <div>
                <h1>Leedle</h1>
                <ul>
                    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                </ul>
                <ul>
                    <Link to={ROUTES.SIGN_UP}> Sign Up</Link>
                </ul>
                <button type = "submit" onClick = {this.onHome}>Home</button>
                <Channel {...this.props} user = {this.props.user} topic = {this.state.chosen}/>
                </div>
            )
        }
        else {
            return (
                this.props.user ?
                <div>
                <h1>Leedle</h1>
                <SignOut {...this.props} user={this.props.user}/>
                <Topic {...this.props} user={this.props.user} />
                <div id = "topic">
                {this.state.topics.map(topic=>{
                        return (<MyButton onClick = {() => this.onButtonClick(topic[1])} key={topic}>Created by: {topic[0]} {topic[1]}</MyButton>);
                    })} 
                </div>
                <button type = "submit" onClick = {this.onHome}>Home</button>
                </div>
                :
                <div>
                <h1>Leedle</h1>
                <ul>
                    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                </ul>
                <ul>
                    <Link to={ROUTES.SIGN_UP}> Sign Up</Link>
                </ul>
                <div id = "topic">
                
                {this.state.topics.map(topic=>{
                        return (<MyButton onClick = {() => this.onButtonClick(topic[1])} key={topic}>Created by: {topic[0]} {topic[1]}</MyButton>);
                    })} 
                </div>
                <button type = "submit" onClick = {this.onHome}>Home</button>
                </div>
            )
        }
    }
}

export default Landing;