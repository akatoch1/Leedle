import React, { Component } from 'react';
//import 'typeface-roboto';
//import Button from '@material-ui/core/Button';
//import Drawer from '@material-ui/core/Drawer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../Firebase';
import SignOut from '../SignOut';

const App = () => (
  <div>
      <FirebaseContext.Consumer>
        {firebase => <Apps firebase={firebase} />}
      </FirebaseContext.Consumer>
    </div>
  );

class Apps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null, 
      channels: []
    }
    
  }
  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged( u => {
      if (u) {
        this.setState({user: u});
      } else {
        this.setState({user: null});
      }
    });
    
  }
  render() {
    return (<Router>
    <div>
      <hr />
      <Switch>
        
        <Route exact path={ROUTES.LANDING} render = {(props) => <LandingPage {...props} user={this.state.user}/>} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} render = {(props) => <SignInPage {...props} user={this.state.user}/>} />
        <Route path={ROUTES.SIGN_IN} render = {(props) => <SignInPage {...props} user={this.state.user}/>} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} /> 
        <Route path={ROUTES.SIGN_OUT}  render = {(props) => <SignOut {...props}/>} />
      </Switch>
      
    </div>
  </Router>)
  }
}; 
export default App;