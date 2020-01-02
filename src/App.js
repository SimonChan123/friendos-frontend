import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';

// Redux imports
import { Provider } from 'react-redux';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import store from './redux/store';

// Components imported
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';

// Pages imported
import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';
import user from './pages/user';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 'https://us-central1-friendo-13f2a.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar/>
            <div className='container'>
              <Switch>
                <Route exact path="/" component={ home } />
                <Route exact path="/home" component={ home } />
                <AuthRoute exact path="/signup" component={ signup } />
                <AuthRoute exact path="/login" component={ login } />
                <Route exact path="/users/:handle" component={ user } />
                <Route exact path="/users/:handle/post/:postID" component={ user } />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
  );
}

export default App;
