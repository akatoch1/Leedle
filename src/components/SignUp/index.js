import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';

import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
<div>
    <h1>SignUp</h1>
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    name: '',
    error: null,
  };

class SignUpForm extends Component {
    constructor(props) {
      super(props);
      this.state = {...INITIAL_STATE};
    }
    onSubmit = event => {
        event.preventDefault();
        const { email, password,name, error } = this.state;
        let thedb = this.props.firebase.db;
        this.props.firebase.auth.createUserWithEmailAndPassword(email, password)
        .then(function(result) {
          return result.user.updateProfile({
            displayName: name
          })
        })
        .catch(function(error) {
          // Handle Errors here.
          var e = document.querySelector("#error");
          e.innerText = error.message;
          // ...
        });
        //thedb.ref("/users").child(email).set(password); writing to database
        this.setState({ ...INITIAL_STATE });
        return false;
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const {
            email,
            password,
            name,
            error,
        } = this.state;
      return (
        <form onSubmit={this.onSubmit}>
        <input
          name="name"
          value={name}
          onChange={this.onChange}
          type="text"
          placeholder="Name"
        />
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
        <button type="submit">Sign Up</button>
        <div id = "error"></div>
      </form>
      );
    }
  }

  
  


  const SignUpLink = () => (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );
  export default SignUpPage;
  export { SignUpForm, SignUpLink };