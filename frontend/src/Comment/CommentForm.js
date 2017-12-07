import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormField from './../Core/FormField'

class CommentForm extends Component {

    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            body: '',
            author: ''
        };
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
            parentId: this.props.post.id,
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
        return (
            <form onSubmit={this.onSubmit} >
                <FormField name="author" label="Author" type="text" onChange={this.onChange} />
                <FormField name="body" label="Body" type="textarea" onChange={this.onChange} />
                <div className="row">
                    <div className="form-group col-lg-2">
                        <button type="submit" className="btn btn-block btn-primary">Save</button>
                    </div>
                </div>
            </form>
        );
    }

}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired
}

export default CommentForm