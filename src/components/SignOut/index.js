import React, { Component } from 'react'
import firebase from "firebase"
const SignOut = (props) => (
<div>
{console.log(props)}
<button
    type="button"
    onClick={() => firebase.auth().signOut()}
  > Sign Out </button>
</div>
);



export default SignOut;