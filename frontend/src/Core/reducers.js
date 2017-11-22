import _ from 'lodash'
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
            return action.payload.sort((a, b) => b.voteScore - a.voteScore)
        case actions.CREATE_POST:
            return [...state, action.payload].sort((a, b) => b.voteScore - a.voteScore)
        case actions.EDIT_POST:
        case actions.VOTE_POST:
            const post = action.payload
            const newState = state.filter(p => p.id !== post.id)
            return [...newState, post].sort((a, b) => b.voteScore - a.voteScore)
        default:
            return state
    }
}

const commentsReducer = (state = {}, action) => {
    switch(action.type) {
        case actions.LIST_COMMENTS:
        case actions.CREATE_COMMENT:
        case actions.EDIT_COMMENT:
            return { ...state, [action.payload.parentId]: action.payload.comments }
        case actions.REMOVE_COMMENT:
            return _.omit(state, [action.payload.parentId])
        default:
            return state
    }
}

const rootReducer = combineReducers({
    categories: categoriesReducer,
    posts: postsReducer,
    comments: commentsReducer
});

export default rootReducer