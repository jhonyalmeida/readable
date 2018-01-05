import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { listComments, votePost, removePost, createComment } from './../Core/actions'
import Comment from './../Comment/Comment'
import CommentForm from './../Comment/CommentForm'
import './Post.css'

class Post extends Component {

    componentDidMount() {
        if (this.props.showComments) {
            this.props.listComments(this.props.post.id)
        }
    }

    removePost() {
        const post = this.props.post
        const onRemove = this.props.onRemove || (() => {})
        this.props.removePost(post, onRemove())
    }

    render() {
        const post = this.props.post
        const date = new Date(post.timestamp)
        const removePost = this.props.removePost.bind(this)
        return (
            <div className="card">
                <div className="card-body">
                    <div className="close-btn">
                        <button type="button" className="btn btn-link" onClick={this.removePost.bind(this)}>
                            <span className="fa fa-close"></span>
                        </button>
                    </div>
                    <h4 className="card-title">
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </h4>
                    <h6 className="card-subtitle mb-2 text-muted">
                        By {post.author} at {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}
                    </h6>
                    <p className="card-text">{post.body}</p>
                    {this.renderVotes()}
                    {this.props.showComments && this.renderComments()}
                </div>
            </div>
        );
    }

    renderVotes() {
        const post = this.props.post
        const votePost = this.props.votePost.bind(this)
        return (
            <div className="input-group vote-buttons">
                <span className="input-group-addon">{post.voteScore} votes</span>
                <span className="input-group-btn">
                    <button type="button" className="btn" onClick={() => votePost(post, 1)}>
                        <span className="fa fa-plus"></span>
                    </button>
                </span>
                <span className="input-group-btn">
                    <button type="button" className="btn" onClick={() => votePost(post, -1)}>
                        <span className="fa fa-minus"></span>
                    </button>
                </span>
            </div>
        )
    }

    renderComments() {
        const comments = this.props.comments || []
        return (
            <div>
                {comments.map(c => <Comment key={c.id} comment={c} />)}
                <CommentForm post={this.props.post} submit={this.props.createComment} />
            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {
    return {
        comments: state.comments[ownProps.post.id]
    }
}

export default connect(mapStateToProps, { 
    listComments, votePost, removePost, createComment
})(Post)