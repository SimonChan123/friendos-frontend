import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// redux imports
import { connect } from 'react-redux';


const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) => 
            authenticated === true ? <Redirect to='/' /> : <Component {...props} />
        }
    />
)

AuthRoute.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(AuthRoute);
