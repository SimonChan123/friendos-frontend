import React, { Component, Fragment } from 'react';
import MyButton from '../util/MyButtton';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// redux imports
import { connect } from 'react-redux';

// material ui icon imports
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';

// Material UI imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon />
                                </MyButton>
                            </Link>
                            <MyButton tip="Make a post!">
                                <AddIcon />
                            </MyButton>
                            <MyButton tip="Notifications">
                                <NotificationsIcon />
                            </MyButton>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color="inherit" component={Link} to='/'>
                                Home
                            </Button>
                            <Button color="inherit" component={Link} to='/signup'>
                                Sign up
                            </Button>
                            <Button color="inherit" component={Link} to='/login'>
                                Login
                            </Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.protoTypes = {
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
