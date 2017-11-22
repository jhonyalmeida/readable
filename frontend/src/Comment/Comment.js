import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Comment.css'

class Comment extends Component {

    render() {
        const comment = this.props.comment
        const date = new Date(comment.timestamp)
        return (
            <div className="alert alert-secondary">
                <strong>At {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}, {comment.author} says: </strong>
                {comment.body}
            </div>
        );
    }

}

export default connect(null)(Comment)