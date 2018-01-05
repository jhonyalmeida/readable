import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import CommentForm from './CommentForm'
import { createComment, editComment, getComment } from './../Core/actions'

class CommentFormView extends Component {

    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
    }

    componentDidMount() {
        const commentId = this.props.match.params.comment
        if (commentId && !this.props.comment) {
            this.props.getComment(commentId)
        }
    }

    submit(comment) {
        const save = comment.voteScore ? this.props.editComment : this.props.createComment
        save(comment, c => {
            this.props.history.push(`/posts/${c.parentId}`)
        });
    }

    render() {
        const comment = this.props.comment
        return (
            <div style={{marginTop: '1.1em'}}>
                <h3>{comment ? `Edit Comment` : 'New Post'}</h3>
                <CommentForm comment={comment} submit={this.submit} />
            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {
    const parentId = ownProps.match.params.post
    const commentId = ownProps.match.params.comment
    return {
        comment: _.find(state.comments[parentId], (c) => c.id === commentId)
    }
}

export default withRouter(
    connect(mapStateToProps, { createComment, editComment, getComment })(CommentFormView)
);