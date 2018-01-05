import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import PostForm from './PostForm'
import { createPost, editPost, getPost } from './../Core/actions'

class PostFormView extends Component {

    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
    }

    componentDidMount() {
        const postId = this.props.match.params.post
        if (postId && !this.props.post) {
            this.props.getPost(postId)
        }
    }

    submit(post) {
        const save = post.voteScore ? this.props.editPost : this.props.createPost
        save(post, p => {
            this.props.history.push(`/${p.category}/posts`)
        });
    }

    render() {
        const post = this.props.post
        return (
            <div style={{marginTop: '1.1em'}}>
                <h3>{post ? `Edit ${post.title}` : 'New Post'}</h3>
                <PostForm post={post} categories={this.props.categories} submit={this.submit} cancelLink="/" />
            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {
    const postId = ownProps.match.params.post
    return {
        post: _.find(state.posts, (p) => p.id === postId)
    }
}

export default withRouter(
    connect(mapStateToProps, { createPost, editPost, getPost })(PostFormView)
);