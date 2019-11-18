import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';
const SignInPage = (props) => (
    <div>
        <h1>SignIn</h1>
        <FirebaseContext.Consumer>
          {firebase => <SignInForm firebase={firebase} user={props.user} />}
        </FirebaseContext.Consumer>
      </div>
    );

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
  };
class SignInForm extends Component {
    constructor(props) {
      super(props);
      this.state = {...INITIAL_STATE};
    }
    onSubmit = event => {
        event.preventDefault();
        const { email, password, error } = this.state;
        this.props.firebase.auth.signInWithEmailAndPassword(email, password).then(() =>{
            this.setState({ ...INITIAL_STATE });

        }
        ).catch(error => {
            this.setState({error_msg: error});
        });
        return false;
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const {
            email,
            password,
            error,
        } = this.state;
        return (
        this.props.user ? 
        (<Redirect to={ROUTES.LANDING}/>)
        :
        <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
        {error && <p>{error.message}</p>}
      </form> 
      );
    }
  }

export default SignInPage;