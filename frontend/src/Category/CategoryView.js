import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { listPosts } from './../Core/actions'
import Post from './../Post/Post'
import './CategoryView.css'

class CategoryView extends Component {  

    componentDidMount() {
        this.props.listPosts(this.props.match.params.category)
    }

    componentWillReceiveProps(nextProps) {
        const category = nextProps.match.params.category
        if (category !== this.props.match.params.category) {
            this.props.listPosts(category)
        }
    }

    render() {
        const posts = this.props.posts
        return [
            <div key="posts" className="card-deck">
                {posts.length > 0 
                    ? posts.map(post => <Post key={post.id} post={post} showComments={true} />)
                    : <div>Nenhum post nesta categoria.</div>
                }
            </div>,
            <div key="addButton" className="btn-add">
                <Link className="btn btn-default" to="/posts/new">
                    <span className="fa fa-plus"></span>
                </Link>
            </div>
        ]
    }

}

function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps, { listPosts })(CategoryView)