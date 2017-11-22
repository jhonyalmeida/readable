import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listCategories, listPosts } from './../Core/actions'
import Menubar from './Menubar'
import Post from './../Post/Post'

class MainView extends Component {

    componentDidMount() {
        this.props.listCategories()
        this.props.listPosts()
    }

    render() {
        const posts = this.props.posts
        if (posts.length > 0) {
            return (
                <div className="container">
                    <Menubar categories={this.props.categories} />
                    {posts.map(post => <Post key={post.id} post={post} />)}
                </div>
            )
        } else {
            return <p>Nenhum post cadastrado.</p>
        }
    }

}

function mapStateToProps(state, ownProps) {
    return {
        categories: state.categories,
        posts: state.posts
    }
}

export default connect(mapStateToProps, { listCategories, listPosts })(MainView)