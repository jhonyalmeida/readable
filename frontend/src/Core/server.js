const SERVER_URL = 'http://localhost:3001'
const API_KEY = 'expectopatronum'

const fetchConfig = { headers: { 
    'Authorization': API_KEY,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
} };

function getCategories() {
    return fetch(`${SERVER_URL}/categories`, fetchConfig)
        .then(res => res.json())
}

function listPosts(category = null) {
    return fetch(category ? `${SERVER_URL}/${category}/posts` : `${SERVER_URL}/posts`, fetchConfig)
        .then(res => res.json())
}

function getPost(id) {
    return fetch(`${SERVER_URL}/posts/${id}`, fetchConfig)
        .then(res => res.json())
}

function createPost(post) {
    return fetch(`${SERVER_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify(post),
        ...fetchConfig
    }).then(res => res.json());
}

function editPost({id, title, body}) {
    return fetch(`${SERVER_URL}/posts/${id}`, {
        method: 'PUT',
        body: {title, body},
        ...fetchConfig
    }).then(res => res.json());
}

function votePost(id, vote = 1) {
    return fetch(`${SERVER_URL}/posts/${id}`, {
        method: 'POST',
        body: JSON.stringify({option: vote == 1 ? 'upVote' : 'downVote'}),
        ...fetchConfig
    }).then(res => res.json());
}

function removePost(id) {
    return fetch(`${SERVER_URL}/posts/${id}`, {
        method: 'DELETE',
        ...fetchConfig
    }).then(res => res.json());
}

function listComments(parentId) {
    return fetch(`${SERVER_URL}/posts/${parentId}/comments`, fetchConfig)
        .then(res => res.json())
}

function createComment(comment) {
    return fetch(`${SERVER_URL}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
        ...fetchConfig
    }).then(res => res.json());
}

function editComment({id, body}) {
    return fetch(`${SERVER_URL}/comments/${id}`, {
        method: 'PUT',
        body: { body },
        ...fetchConfig
    }).then(res => res.json());
}

function voteComment(id, vote = 1) {
    return fetch(`${SERVER_URL}/comments/${id}`, {
        method: 'POST',
        body: JSON.stringify({option: vote == 1 ? 'upVote' : 'downVote'}),
        ...fetchConfig
    }).then(res => res.json());
}

function removeComment(id) {
    return fetch(`${SERVER_URL}/comments/${id}`, {
        method: 'DELETE',
        ...fetchConfig
    }).then(res => res.json());
}

export {
    getCategories,
    listPosts, getPost, createPost, editPost, votePost, removePost,
    listComments, createComment, editComment, voteComment, removeComment
}

