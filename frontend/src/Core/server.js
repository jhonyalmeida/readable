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

}

function createPost(post) {
    console.log(JSON.stringify(post))
    return fetch(`${SERVER_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify(post),
        ...fetchConfig
    }).then(res => res.json());
}

function editPost({id, title, body}) {

}

function votePost(id, vote = 1) {
    return fetch(`${SERVER_URL}/posts/${id}`, {
        method: 'POST',
        body: JSON.stringify({option: vote == 1 ? 'upVote' : 'downVote'}),
        ...fetchConfig
    }).then(res => res.json());
}

function removePost(id) {

}

function listComments(parentId) {
    return fetch(`${SERVER_URL}/posts/${parentId}/comments`, fetchConfig)
        .then(res => res.json())
}

function createComment(comment) {

}

function editComment({id, body}) {
    
}

function voteComment(id) {

}

function removeComment(id) {

}

export {
    getCategories,
    listPosts, createPost, editPost, votePost, removePost,
    listComments, createComment, editComment, voteComment, removeComment
}

