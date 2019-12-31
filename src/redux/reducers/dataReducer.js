import { 
    SET_POST,
    SET_POSTS, 
    LIKE_POST, 
    UNLIKE_POST, 
    LOADING_DATA, 
    DELETE_POST, 
    ADD_POST
} from '../types';

const initialState = {
    posts: [],
    post: {},
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case ADD_POST:
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ]
            };
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case SET_POST:
            return {
                ...state,
                post: action.payload
            };
        case LIKE_POST:
            let likeIndex = state.posts.findIndex((post) => post.postID === action.payload.postID);
            state.posts[likeIndex] = action.payload;
            if (state.post.postID === action.payload.postID) {
                state.post = action.payload;
            }
            return {
                ...state,
            };
        case UNLIKE_POST:
            let unlikeIndex = state.posts.findIndex((post) => post.postID === action.payload.postID);
            state.posts[unlikeIndex] = action.payload;
            if (state.post.postID === action.payload.postID) {
                state.post = action.payload;
            }
            return {
                ...state,
            };
        case DELETE_POST:
            let deleteIndex = state.posts.findIndex((post) => post.postID === action.payload);
            state.posts.splice(deleteIndex, 1);
            return {
                ...state,
            };
        default:
            return state;
    }
}