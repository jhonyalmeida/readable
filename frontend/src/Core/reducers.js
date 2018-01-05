import { combineReducers } from 'redux'
import * as actions from './actions'

const categoriesReducer = (state = [], action) => {
    switch(action.type) {
        case actions.LIST_CATEGORIES:
            return action.payload
        default:
            return state
    }
}

const postsReducer = (state = [], action) => {
    switch(action.type) {
        case actions.LIST_POSTS:
            return action.payload
        case actions.CREATE_POST:
        case actions.GET_POST:
            return [...state, action.payload]
        case actions.EDIT_POST:
        case actions.VOTE_POST:
            const post = action.payload
            const otherPosts = state.filter(p => p.id !== post.id)
            return [...otherPosts, post]
        case actions.REMOVE_POST:
            return state.filter(p => p.id !== action.payload.id)
        default:
            return state
    }
}

const commentsReducer = (state = {}, action) => {
    const payload = action.payload
    const sortByVote = itens => itens.sort((a, b) => b.voteScore - a.voteScore)
    let otherComments = []
    switch(action.type) {
        case actions.LIST_COMMENTS:
            return { ...state, [payload.parentId]: sortByVote(payload.comments) }
        case actions.CREATE_COMMENT:
        case actions.GET_COMMENT:
            otherComments = state[payload.parentId] || []
            return { ...state, [payload.parentId]: sortByVote([ ...otherComments, payload ]) }
        case actions.EDIT_COMMENT:
        case actions.VOTE_COMMENT:
            otherComments = state[payload.parentId].filter(c => c.id !== payload.id)
            return { ...state, [payload.parentId]: sortByVote([ ...otherComments, payload ]) }
        case actions.REMOVE_COMMENT:
            otherComments = state[payload.parentId].filter(c => c.id !== payload.id)
            return { ...state, [payload.parentId]: otherComments }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    categories: categoriesReducer,
    posts: postsReducer,
    comments: commentsReducer
})

export default rootReducer