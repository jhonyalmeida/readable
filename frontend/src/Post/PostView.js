import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import { getPost } from './../Core/actions'
import Post from './Post'

class PostView extends Component {

    componentDidMount() {
        const postId = this.props.match.params.post
        if (!this.props.post) {
            this.props.getPost(postId)
        }
    }

    render() {
        const post = this.props.post
        const onRemove = () => this.props.history.push(`/${post.category}/posts`)
        return post
            ? <Post post={this.props.post} showComments={true} onRemove={onRemove.bind(this)} />
            : 'Carregando...'
        
    }

}

function mapStateToProps(state, ownProps) {
    const postId = ownProps.match.params.post
    return {
        post: _.find(state.posts, (p) => p.id === postId)
    }
}

export default withRouter(
    connect(mapStateToProps, { getPost })(PostView)
)