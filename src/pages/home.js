import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

// Import custom Post component
import Post from '../components/Post';

class home extends Component {
    state = {
        posts: null
    }

    componentDidMount(){
        axios.get('/posts')
            .then(response => {
                console.log(response.data);
                this.setState({
                    posts: response.data
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        let recentPostsMarkup = this.state.posts ? (
            this.state.posts.map((post) => <Post post={post}/>)
        ) : <p>Loading posts...</p>;
        return (
            <Grid container spacing={16}>
                <Grid item sm={4} xs={12}>
                    <p>profile</p>
                </Grid>
                <Grid item sm={8} xs={12}>
                    {recentPostsMarkup}
                </Grid>
            </Grid>
        )
    }
}

export default home
