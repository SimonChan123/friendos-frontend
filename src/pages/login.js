import React, { Component } from 'react';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppIcon from '../images/smiley-face.png';

// Material UI imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    form: {
        textAlign: 'center',
    },
    image: {
        width: '64px',
        height: '64px',
        margin: '10px auto 10px auto'
    },
    pageTitle: {
        margin: '5px auto 5px auto'
    },
    textField: {
        margin: '5px auto 15px auto'
    },
    button: {
        margin: '10px auto 15px auto',
        position: 'relative'
    },
    progress: {
        position: 'absolute'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    }
};

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post('/login', userData)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch((err) => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            });
    };
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="smiley face" className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" 
                                   name="email" 
                                   type="email" 
                                   label="Email" 
                                   className={classes.textField} 
                                   helperText={errors.email}
                                   error={errors.email ? true : false}
                                   value={this.state.email}
                                   onChange={this.handleChange}
                                   fullWidth 
                        />
                        <TextField id="password" 
                                   name="password" 
                                   type="password" 
                                   label="Password" 
                                   className={classes.textField} 
                                   helperText={errors.password}
                                   error={errors.password ? true : false}
                                   value={this.state.password}
                                   onChange={this.handleChange}
                                   fullWidth 
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" disabld={loading} className={classes.button} >
                            Login
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <small>
                            Not registered? Sign up <Link to="/signup">here</Link>.
                        </small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login);
