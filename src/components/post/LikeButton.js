import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyButtton from '../../util/MyButtton';
import PropTypes from 'prop-types';

// Redux imports
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

// Material UI Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

class LikeButton extends Component {
    likedPost = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.postID === this.props.postID)) {
            return true;
        } else {
            return false;
        }
    };

    likePost = () => {
        this.props.likePost(this.props.postID);
    };

    unlikePost = () => {
        this.props.unlikePost(this.props.postID);
    };

    render() {
        const { authenticated } = this.props.user; 

        const likeButton = !authenticated ? (
            <Link to="/login">
                <MyButtton tip="Like - must be logged in">
                    <FavoriteBorder color="primary" />
                </MyButtton>
            </Link>
        ) : (
            this.likedPost() ? (
                <MyButtton tip="Unlike this post" onClick={this.unlikePost}>
                    <FavoriteIcon color="primary" />
                </MyButtton>
            ) : (
                <MyButtton tip="Like this post" onClick={this.likePost}>
                    <FavoriteBorder color="primary" />
                </MyButtton>
            )
        );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postID: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) =>({
    user: state.user
});

const mapActionsToProps = { likePost, unlikePost };

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);