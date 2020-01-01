
import React, { Component, Fragment } from 'react';
import MyButtton from '../../util/MyButtton';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// redux imports
import { connect } from 'react-redux';
import { addPost, clearErrors } from '../../redux/actions/dataActions';

// material ui icon imports
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// material ui imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginBottom: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        top: '6%',
        left: '90%'
    }
});

class AddPost extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
        
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '',
                            open: false,
                            errors: {} });
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ 
            open: false,
            errors: {}
        });
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addPost({ body: this.state.body });
    }

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;
        return (
            <Fragment>
                <MyButtton tip="Add a post to the wall!" onClick={this.handleOpen}>
                    <AddIcon />
                </MyButtton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                    >
                    <MyButtton tip="Close window" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButtton>
                    <DialogTitle>
                        Make a new post! :]
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField 
                                name="body"
                                type="text"
                                label="Write a post here..."
                                multiline
                                rows="3"
                                placeholder="Description"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                className={classes.submitButton} 
                                disabled={loading}
                            >
                                Post!
                                {loading && <CircularProgress size={30} className={classes.progressSpinner} />}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
};

AddPost.propTypes = {
    classes: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    UI: state.UI
});

const mapActionsToProps = { addPost, clearErrors };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AddPost));