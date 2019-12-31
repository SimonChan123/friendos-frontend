import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import MyButtton from '../util/MyButtton';
import PostDialog from './PostDialog';
import DeletePost from './DeletePost';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// Redux imports
import { connect } from 'react-redux';

// Material UI Icons
import ChatIcon from '@material-ui/icons/Chat';

// Material UI Card imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 180,
        objectFit: 'contain'
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

class Post extends Component {
    likedPost = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.postID === this.props.post.postID)) {
            return true;
        } else {
            return false;
        }
    };

    likePost = () => {
        this.props.likePost(this.props.post.postID);
    };

    unlikePost = () => {
        this.props.unlikePost(this.props.post.postID);
    };

    render() {
        dayjs.extend(relativeTime);
        const { classes, 
                post: { 
                    body, 
                    createdAt, 
                    userHandle, 
                    userImage, 
                    postID, 
                    likeCount, 
                    commentCount 
                },
                user: {
                    authenticated, 
                    credentials: {
                        handle
                    }
                }
        } = this.props;

        const deleteButton = authenticated && userHandle === handle ? (
            <DeletePost postID={postID} />
        ) : (null);

        return (
            <Card className={classes.card}>
                <CardMedia title="Profile image" image={userImage} className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton postID={postID} />
                    <span>{likeCount} Like(s) </span>
                    <MyButtton tip="Comment on this post">
                        <ChatIcon color="primary" />
                    </MyButtton>
                    <span>{commentCount} comment(s) </span>
                    <PostDialog postID={postID} userHandle={userHandle} />
                </CardContent>
            </Card>
        )
    }
}

Post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    user: state.user
});

const mapActionsToProps = null;

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
