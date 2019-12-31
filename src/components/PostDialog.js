
import React, { Component, Fragment } from 'react';
import LikeButton from './LikeButton';
import MyButtton from '../util/MyButtton';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// redux imports
import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';

// material ui icon imports
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

// material ui imports
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    ...theme.spreadThis,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
      },
      dialogContent: {
        padding: 20
      },
      closeButton: {
        position: 'absolute',
        left: '90%'
      },
      expandButton: {
          position: 'absolute',
          left: '90%'
      },
      spinnerContainer: {
          textAlign: 'center',
          marginTop: 50,
          marginBottom: 50
      }
});

class PostDialog extends Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.props.getPost(this.props.postID);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, 
                UI: { loading },
                post: { 
                    postID, 
                    body, 
                    createdAt, 
                    likeCount, 
                    commentCount, 
                    userImage, 
                    userHandle 
                }} = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerContainer}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={1}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography color="textSecondary" variant="body2">
                        {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton postID={postID} />
                    <span>
                         {likeCount} like(s)
                    </span>
                    <MyButtton tip="Comment on this post">
                        <ChatIcon color="primary" />
                    </MyButtton>
                    <span>{commentCount} comment(s) </span>
                </Grid>
            </Grid>
        );

        return (
            <Fragment>
                <MyButtton onClick={this.handleOpen} tip="Expand this post" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
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
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    };
};

PostDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    postID: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) =>({
    post: state.data.post,
    UI: state.UI
});

const mapActionsToProps = { getPost };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));