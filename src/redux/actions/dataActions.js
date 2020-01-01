import { 
    ADD_POST, 
    SET_POSTS,
    SET_POST, 
    LOADING_DATA, 
    LIKE_POST, 
    UNLIKE_POST, 
    SUBMIT_COMMENT,
    DELETE_POST, 
    LOADING_UI,
    STOP_LOADING_UI, 
    SET_ERRORS, 
    CLEAR_ERRORS,
} from '../types';
import axios from 'axios';

// for showing all the posts
export const getPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/posts')
        .then(response => {
            dispatch({
                type: SET_POSTS,
                payload: response.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_POSTS,
                payload: []
            })
        });
};

// for showing a single post
export const getPost = (postID) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/post/${postID}`)
        .then(response => {
            dispatch({
                type: SET_POST,
                payload: response.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch(err => { console.log(err) });
};

export const addPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/post', newPost)
        .then((response) => {
            dispatch({
                type: ADD_POST,
                payload: response.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

// Like a post
export const likePost = (postID) => (dispatch) => {
    axios.get(`/post/${postID}/like`)
        .then(response => {
            dispatch({
                type: LIKE_POST,
                payload: response.data
            })
        })
        .catch(err => console.log(err));
};

// Unlike a post
export const unlikePost = (postID) => (dispatch) => {
    axios.get(`/post/${postID}/unlike`)
        .then(response => {
            dispatch({
                type: UNLIKE_POST,
                payload: response.data
            })
        })
        .catch(err => console.log(err));
};

// make a comment post
export const submitComment = (postID, commentData) => (dispatch) => {
    axios.post(`/post/${postID}/comment`, commentData)
        .then((response) => {
            dispatch({ 
                type: SUBMIT_COMMENT,
                payload: response.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};

// Delete a post
export const deletePost = (postID) => (dispatch) => {
    axios.delete(`/post/${postID}`)
        .then(() => {
            dispatch({ 
                type: DELETE_POST,
                payload: postID
            })
        })
        .catch(err => console.log(err));
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};