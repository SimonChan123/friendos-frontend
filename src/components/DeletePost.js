import React, { Component, Fragment } from 'react';
import MyButtton from '../util/MyButtton';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Redux imports
import { connect } from 'react-redux';
import { deletePost } from '../redux/actions/dataActions';

// Material UI Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Material UI imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = (theme) => ({
    ...theme.spreadThis,
    deleteButton: {
        position: 'absolute',
        top: '10%',
        left: '90%'
    }
})

class DeletePost extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleDeletePost = () => {
        this.props.deletePost(this.props.postID);
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButtton tip="Delete this post" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary" />
                </MyButtton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Confirm deletion of post.
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleDeletePost} color="secondary">
                            Confirm
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

DeletePost.propTypes = {
    classes: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    postID: PropTypes.string.isRequired,
}

const mapStateToProps = null;

const mapActionsToProps = { deletePost };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(DeletePost));
