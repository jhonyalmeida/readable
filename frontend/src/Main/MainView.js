import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { listPosts } from './../Core/actions'
import Post from './../Post/Post'
import './MainView.css'

class MainView extends Component {

    componentDidMount() {
        this.props.listPosts()
        this.state = {orderBy: 'voteScore'}
    }

    componentWillReceiveProps(nextProps) {
        const orderBy = this.state ? this.state.orderBy : 'voteScore'
        nextProps.posts.sort((a, b) => b[orderBy] - a[orderBy])
    }

    onChange(event) {
        const value = event.target.value
        this.setState({orderBy: value})
        this.props.posts.sort((a, b) => b[value] - a[value])
    }

    render() {
        const posts = this.props.posts
        return [
            <div>
                <select className="form-control" onChange = {this.onChange.bind(this)}>
                    <option value="voteScore">Most voted</option>
                    <option value="timestamp">Most recent</option>
                </select>
            </div>,
            <div key="posts" className="card-deck">
                {posts.length > 0 
                    ? posts.map(post => <Post key={post.id} post={post} showComments={false} />)
                    : <div>Nenhum post cadastrado.</div>
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

export default connect(mapStateToProps, { listPosts })(MainView)