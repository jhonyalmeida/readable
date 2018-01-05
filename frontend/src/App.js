import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import { listCategories } from './Core/actions'
import Menubar from './Core/components/Menubar'
import MainView from './Main/MainView'
import CategoryView from './Category/CategoryView'
import PostView from './Post/PostView'
import PostFormView from './Post/PostFormView'
import CommentFormView from './Comment/CommentFormView'

class App extends Component {

  componentDidMount() {
    this.props.listCategories()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Menubar categories={this.props.categories || []} />
          <Switch>
            <Route exact path="/" component={MainView} />
            <Route path="/posts/new" render={() => <PostFormView categories={this.props.categories} />} />
            <Route exact path="/posts/:post" component={PostView} />
            <Route path="/posts/:post/edit" 
                   render={() => <PostFormView categories={this.props.categories} />} />
            <Route path="/posts/:post/comments/:comment/edit" component={CommentFormView} />
            <Route path="/:category/posts" component={CategoryView} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }

}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps, { listCategories })(App)


