import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import FormField from './../Core/components/FormField'

class PostForm extends Component {

    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            id: this.generateKey(), 
            timestamp: Date.now(),
            title: '',
            body: '',
            author: '',
            category: null
        };
    }

    componentDidMount() {
        const props = this.props
        if (props.categories.length > 0) {
            this.setState({ category: props.categories[0].path })
        }
        if (props.post) {
            this.setState(props.post)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories.length > 0) {
            this.setState({ category: nextProps.categories[0].path })
        }
        if (nextProps.post) {
            this.setState(nextProps.post)
        }
    }

    onChange(event) {
        const property = event.target.name
        this.setState({ [property]: event.target.value })
    }

    onSubmit(event) {
        event.preventDefault()
        this.props.submit(this.state)
    }

    generateKey() {   
        let text = ''
        const charset = 'abcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < 22; i++) {
            text += charset.charAt(Math.floor(Math.random() * charset.length))
        }
        return text
    }

    render() {
        const post = this.state
        const categories = this.props.categories.map(c => ({id: c.path, label: c.name}))
        return (
            <form onSubmit={this.onSubmit} >
                <FormField name="title" value={post.title} label="Title" type="text" onChange={this.onChange} />
                <FormField name="author" value={post.author} label="Author" type="text" 
                           onChange={this.onChange} disabled={post.voteScore} />
                <FormField name="body" value={post.body} label="Body" type="textarea" onChange={this.onChange} />
                <FormField name="category" value={post.category} label="Category" type="select" 
                           options={categories} onChange={this.onChange} disabled={post.voteScore} />
                {this.renderCommands()}
            </form>
        );
    }

    renderCommands() {
        const linkCancel = this.props.cancelLink
        return (
            <div className="row">
                <div className="form-group col-lg-2">
                    <button type="submit" className="btn btn-block btn-primary">Save</button>
                </div>
                {linkCancel && 
                    <div className="form-group col-lg-2">
                        <Link className="btn btn-block btn-danger" to={linkCancel}>Cancel</Link>
                    </div>
                }
            </div>
        )
    }

}

PostForm.propTypes = {
    post: PropTypes.object,
    categories: PropTypes.array.isRequired,
    submit: PropTypes.func.isRequired,
    cancelLink: PropTypes.string
}

export default PostForm