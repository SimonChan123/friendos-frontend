import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// redux imports
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

// Material UI imports
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
    ...theme.spreadThis,
    commnetImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20,

    }
});

class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', errors: {} });
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.postID, { body: this.state.body });
    };

    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                    name="body"
                    type="text"
                    label="Comment on post!"
                    error = {errors.comment ? true : false}
                    helperText = {errors.comment}
                    value = {this.state.body} 
                    onChange = {this.handleChange}
                    fullWidth
                    className = {classes.textField}
                    />
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
                <hr className={classes.visibleSeparator} />
            </Grid>
        ) : null;

        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    classes: PropTypes.object.isRequired,
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    postID: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    UI: state.UI,
    user: state.user,
    authenticated: state.user.authenticated
});

const mapActionsToProps = { submitComment };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));
