import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Comment.css'
import { voteComment, removeComment } from './../Core/actions'

class Comment extends Component {

    render() {
        const comment = this.props.comment
        const date = new Date(comment.timestamp)
        const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        const removeComment = this.props.removeComment.bind(this)
        return (
            <div className="alert alert-secondary">
                <div className="close-btn">
                    <button type="button" className="btn btn-link" onClick={() => removeComment(comment)}>
                        <span className="fa fa-close"></span>
                    </button>
                </div>
                <strong>At {dateString}, {comment.author} says: </strong>
                {comment.body}
                {this.renderVotes()}
            </div>
        )
    }

    renderVotes() {
        const comment = this.props.comment
        const voteComment = this.props.voteComment.bind(this)
        return (
            <div className="input-group vote-buttons">
                <span className="input-group-addon">{comment.voteScore} votes</span>
                <span className="input-group-btn">
                    <button type="button" className="btn" onClick={() => voteComment(comment, 1)}>
                        <span className="fa fa-plus"></span>
                    </button>
                </span>
                <span className="input-group-btn">
                    <button type="button" className="btn" onClick={() => voteComment(comment, -1)}>
                        <span className="fa fa-minus"></span>
                    </button>
                </span>
            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {
    const comment = ownProps.comment
    return {
        comment: state.comments[comment.parentId].filter(c => c.id === comment.id)[0]
    }
}

export default connect(mapStateToProps, { voteComment, removeComment })(Comment)