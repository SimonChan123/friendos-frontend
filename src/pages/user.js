import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import StaticProfile from '../components/profile/StaticProfile';
import Post from '../components/post/Post';

// redux imports
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

// Material UI imports
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
    ...theme.spreadThis,
});

class user extends Component {
    state = {
        profile: null,
        postIDParam: null
    };

    componentDidMount() {
        const handle = this.props.match.params.handle;
        const postID = this.props.match.params.postID;

        if (postID) {
            this.setState({ postIDParam: postID });
        }

        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
            .then((response) => {
                this.setState({
                    profile: response.data.user
                });
            })
            .catch((err) => console.log(err));
    }
    render() {
        const { posts, loading } = this.props.data;
        const { postIDParam } = this.state;

        const postsMarkup = loading ? (
            <p>Loading...</p>
        ) : posts === null ? (
            <p>No posts from the current user</p>
        ) : !postIDParam ? (
            posts.map(post => <Post key={post.postID} post={post}/> )
        ) : (
            posts.map(post => {
                if (post.postID !== postIDParam) {
                    return <Post key={post.postID} post={post}/>;
                } else {
                    return <Post key={post.postID} post={post} openDialog/>
                }
            })
        );

        return (
            <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <p>Loading user profile...</p>
                    ) : (
                        <StaticProfile profile={this.state.profile} />
                    )}
                </Grid>
                <Grid item sm={8} xs={12}>
                    {postsMarkup}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    classes: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    data: state.data
});

const mapActionsToProps = { getUserData };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(user));
