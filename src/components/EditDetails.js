import React, { Component, Fragment } from 'react';
import MyButtton from '../util/MyButtton';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// redux imports
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

// material ui icon imports
import EditIcon from '@material-ui/icons/Edit';

// material ui imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        float: "right"
    }
});

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        });
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials);
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButtton tip="Edit user details" onClick={this.handleOpen} btnClassName={classes.button}>
                            <EditIcon color="primary" />
                        </MyButtton>
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <DialogTitle>
                        Edit your profile details
                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                placeholder="A short bio about yourself"
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth 
                            />
                            <TextField
                                name="website"
                                type="text"
                                label="Website"
                                placeholder="Website"
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth 
                            />
                            <TextField
                                name="location"
                                type="text"
                                label="Location"
                                placeholder="Location"
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth 
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} color="primary">
                            Save
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.protoTypes = {
    credentials: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

const mapActionsToProps = { editUserDetails };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails));
