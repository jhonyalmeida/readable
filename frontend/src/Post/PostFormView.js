import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PostForm from './PostForm'
import { createPost, listCategories } from './../Core/actions'

class PostFormView extends Component {

    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
    }

    componentDidMount() {
        this.props.listCategories()
    }

    submit(post) {
        this.props.createPost(post, p => {
            this.props.history.push(`/${p.category}/posts`)
        });
    }

    render() {
        return (
            <div className="container">
                <h3>New Post</h3>
                <PostForm categories={this.props.categories} submit={this.submit} cancelLink="/" />
            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {
    return {
        categories: state.categories
    }
}

export default withRouter(
    connect(mapStateToProps, { listCategories, createPost })(PostFormView)
);