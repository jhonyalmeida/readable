import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listPosts } from './../Core/actions'
import Post from './../Post/Post'

class CategoryView extends Component {

    componentDidMount() {
        const category = this.props.match.params.category
        this.props.listPosts(category)
    }

    render() {
        const posts = this.props.posts
        if (posts.length > 0) {
            return (
                <div className="container">
                    {posts.map(post => <Post key={post.id} post={post} showComments={true} />)}
                </div>
            )
        } else {
            return <p>Nenhum post nesta categoria.</p>
        }
    }

}

function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps, { listPosts })(CategoryView)