import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { listCategories, listPosts } from './../Core/actions'
import Menubar from './Menubar'
import Post from './../Post/Post'
import './MainView.css'

class MainView extends Component {

    componentDidMount() {
        this.props.listCategories()
        this.props.listPosts()
    }

    render() {
        const posts = this.props.posts
        return (
            <div className="container">
                <Menubar categories={this.props.categories} />
                <div className="card-group">
                    {posts.length > 0 
                        ? posts.map(post => <Post key={post.id} post={post} showComments={false} />)
                        : <div>Nenhum post cadastrado.</div>
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

export default connect(mapStateToProps, { listCategories, listPosts })(MainView)