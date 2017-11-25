import * as server from './server'

export const START_REQUEST = 'START_REQUEST'

export const LIST_CATEGORIES = 'LIST_CATEGORIES'

export const LIST_POSTS = 'LIST_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const VOTE_POST = 'VOTE_POST'

export const LIST_COMMENTS = 'LIST_COMMENTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export function listCategories() {
    return (dispatch) => {
        dispatch({ type: START_REQUEST })
        server.getCategories().then(res => dispatch({
            type: LIST_CATEGORIES,
            payload: res.categories
        }))
    }
}

export function listPosts(category = null) {
    return (dispatch) => {
        server.listPosts(category).then(posts => dispatch({
            type: LIST_POSTS,
            payload: posts
        }))
    }
}

export function createPost(post, callback = () => {}) {
    return (dispatch) => {
        server.createPost(post).then(post => {
            dispatch({
                type: CREATE_POST,
                payload: post
            })
            callback(post)
        })
    }
}

export function votePost(post, vote) {
    return (dispatch) => {
        server.votePost(post.id, vote).then(post => {
            dispatch({
                type: VOTE_POST,
                payload: post
            })
        })
    }
}

export function editPost(post, callback = () => {}) {
    return (dispatch) => {
        server.editPost(post).then(post => {
            dispatch({
                type: EDIT_POST,
                payload: post
            })
            callback(post)
        })
    }
}

export function removePost(post, callback = () => {}) {
    return (dispatch) => {
        server.removePost(post.id).then(post => {
            dispatch({
                type: REMOVE_POST,
                payload: post
            })
            callback(post)
        })
    }
}

export function listComments(postId) {
    return (dispatch) => {
        server.listComments(postId).then(comments => dispatch({
            type: LIST_COMMENTS,
            payload: { parentId: postId, comments }
        }))
    }
}

export function createComment(comment, callback = () => {}) {

}

export function voteComment(comment, vote) {

}

export function editComment(comment, callback = () => {}) {
    
}

export function removeComment(comment, callback = () => {}) {
    
}