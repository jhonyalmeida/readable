import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormField from './../Core/components/FormField'

class CommentForm extends Component {

    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            id: this.generateKey(), 
            timestamp: Date.now(),
            body: '',
            author: '',
            parentId: this.props.post ? this.props.post.id : null
        };
    }

    componentDidMount() {
        if (this.props.comment) {
            this.setState(this.props.comment)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.comment) {
            this.setState(nextProps.comment)
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
        const comment = this.state
        return (
            <form onSubmit={this.onSubmit} >
                <FormField name="author" value={comment.author} label="Author" type="text" 
                           onChange={this.onChange} disabled={comment.voteScore} />
                <FormField name="body" value={comment.body} label="Body" type="textarea" onChange={this.onChange} />
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
    comment: PropTypes.object,
    post: PropTypes.object,
    submit: PropTypes.func.isRequired
}

export default CommentForm