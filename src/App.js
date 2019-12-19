import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Components imported
import Navbar from './components/Navbar';

// Pages imported
import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#3378af',
      main: '#01579b',
      dark: '#003c6c',
      contrastText: '#fff'
    },
    secondary: {
      light: '#3378af',
      main: '#01579b',
      dark: '#003c6c',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar/>
          <div className='container'>
            <Switch>
              <Route exact path="/" component={ home }/>
              <Route exact path="/home" component={ home }/>
              <Route exact path="/signup" component={ signup }/>
              <Route exact path="/login" component={ login }/>
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
