/* import React, { Component } from 'react';
import { FirebaseContext } from '../Firebase';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Vote = (props) => (
    <div>
        <FirebaseContext.Consumer>
          {firebase => <VotePage firebase={firebase} user={props.user} topic = {props.topic}/>}
        </FirebaseContext.Consumer>
    </div>
);

class VotePage extends Component {

}

export default Vote; */