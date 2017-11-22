import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import MainView from './Main/MainView'
import CategoryView from './Category/CategoryView'
import PostFormView from './Post/PostFormView'

export default (props) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={MainView} />
      <Route path="/posts/new" component={PostFormView} />
      <Route path="/:category/posts" component={CategoryView} />
    </Switch>
  </BrowserRouter>
)
