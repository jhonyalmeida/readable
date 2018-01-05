import * as server from './server'

export const LIST_CATEGORIES = 'LIST_CATEGORIES'

export const LIST_POSTS = 'LIST_POSTS'
export const GET_POST = 'GET_POST'
export const CREATE_POST = 'CREATE_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const VOTE_POST = 'VOTE_POST'

export const LIST_COMMENTS = 'LIST_COMMENTS'
export const GET_COMMENT = 'GET_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export function listCategories() {
    return (dispatch) => {
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

export function getPost(id) {
    return (dispatch) => {
        server.getPost(id).then(post => dispatch({
            type: GET_POST,
            payload: post
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

export function getComment(id) {
    return (dispatch) => {
        server.getComment(id).then(comment => dispatch({
            type: GET_COMMENT,
            payload: comment
        }))
    }
}

export function createComment(comment, callback = () => {}) {
    return (dispatch) => {
        server.createComment(comment).then(comment => {
            dispatch({
                type: CREATE_COMMENT,
                payload: comment
            })
            callback(comment)
        })
    }
}

export function voteComment(comment, vote) {
    return (dispatch) => {
        server.voteComment(comment.id, vote).then(comment => {
            dispatch({
                type: VOTE_COMMENT,
                payload: comment
            })
        })
    }
}

export function editComment(comment, callback = () => {}) {
    return (dispatch) => {
        server.editComment(comment).then(comment => {
            dispatch({
                type: EDIT_COMMENT,
                payload: comment
            })
            callback(comment)
        })
    }
}

export function removeComment(comment, callback = () => {}) {
    return (dispatch) => {
        server.removeComment(comment.id).then(comment => {
            dispatch({
                type: REMOVE_COMMENT,
                payload: comment
            })
            callback(comment)
        })
    }
}