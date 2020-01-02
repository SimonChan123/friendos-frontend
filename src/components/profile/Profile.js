import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import EditDetails from './EditDetails'
import dayjs from 'dayjs';
import MyButtton from '../../util/MyButtton';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ProfileSkeleton from '../../util/ProfileSkeleton';

// redux imports
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

// material ui imports
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// material ui icon imports
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

const styles = (theme) => ({
    ...theme.spreadThis
});

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {
        const { 
            classes, 
            user: { 
                credentials: { 
                    handle, 
                    createdAt, 
                    imageUrl, 
                    bio, 
                    website, 
                    location 
                }, 
                loading,
                authenticated
            } 
        } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image" />
                        <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
                        <MyButtton tip="Change profile picture" onClick={this.handleEditPicture} btnClassName="button">
                            <EditIcon color="primary" />
                        </MyButtton>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle} 
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr />
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary" />
                                <a href={website}  target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr />
                            </Fragment>
                        )}
                        {location && (
                            <Fragment>
                                <LocationOn color="primary" /> 
                                <span>
                                    {location}
                                </span>
                                <hr />
                            </Fragment>
                        )}
                        <CalendarToday color="primary" />
                        {' '}
                        <span>
                            Account created on: {dayjs(createdAt).format('MMM YYYY')}
                        </span>
                    </div>
                    <MyButtton tip="Logout" onClick={this.handleLogout}>
                            <KeyboardReturn color="primary" />
                    </MyButtton>
                    <EditDetails />
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No user profile found, please try logging in again. :(
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                        Sign up
                    </Button>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                </div>
            </Paper>
        )) : (<ProfileSkeleton />);

        return profileMarkup;
    }
}

Profile.protoTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
