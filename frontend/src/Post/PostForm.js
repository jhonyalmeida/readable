import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import FormField from './../Core/FormField'

class PostForm extends Component {

    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            title: '',
            body: '',
            author: '',
            category: null
        };
    }

    componentWillReceiveProps() {
        this.setState({ category: this.props.categories[0].path })
    }

    onChange(event) {
        const property = event.target.name
        this.setState({ [property]: event.target.value })
    }

    onSubmit(event) {
        event.preventDefault()
        this.props.submit({
            id: this.generateKey(), 
            timestamp: Date.now(),
            ...this.state
        })
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
        const categories = this.props.categories.map(c => ({id: c.path, label: c.name}))
        const linkCancel = this.props.cancelLink
        return (
            <form onSubmit={this.onSubmit} >
                <FormField name="title" label="Title" type="text" onChange={this.onChange} />
                <FormField name="author" label="Author" type="text" onChange={this.onChange} />
                <FormField name="body" label="Body" type="textarea" onChange={this.onChange} />
                <FormField name="category" label="Category" type="select" options={categories} onChange={this.onChange} />
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
            </form>
        );
    }

}

PostForm.propTypes = {
    categories: PropTypes.array.isRequired,
    submit: PropTypes.func.isRequired,
    cancelLink: PropTypes.string
}

export default PostForm