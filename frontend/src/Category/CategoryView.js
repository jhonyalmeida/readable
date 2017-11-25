import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { listPosts, listCategories } from './../Core/actions'
import Post from './../Post/Post'
import Menubar from './../Main/Menubar'
import './CategoryView.css'

class CategoryView extends Component {

    componentDidMount() {
        this.props.listCategories()
    }

    componentWillReceiveProps() {
        const category = this.props.match.params.category
        this.props.listPosts(category)
    }

    render() {
        const posts = this.props.posts
        return (
            <div className="container">
                <Menubar categories={this.props.categories} />
                <div className="card-group">
                    {posts.length > 0 
                        ? posts.map(post => <Post key={post.id} post={post} showComments={true} />)
                        : <div>Nenhum post nesta categoria.</div>
                    }
                </div>
                <div className="btn-add">
                    <Link className="btn btn-default" to="/posts/new">
                        <span className="fa fa-plus"></span>
                    </Link>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {
    return {
        categories: state.categories,
        posts: state.posts
    }
}

export default connect(mapStateToProps, { listCategories, listPosts })(CategoryView)