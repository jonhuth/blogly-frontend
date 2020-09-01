import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from './Homepage';
import NewPost from './NewPost';
import Post from './Post';

function Routes() {
return (
  <div>
    <main>
      <Switch>
        <Route exact path='/'>
          <Homepage />
        </Route>
        <Route exact path='/page/:page'>
          <Homepage />
        </Route>
        <Route exact path='/new'>
          <NewPost />
        </Route>
        <Route exact path='/:postId'>
          <Post />
        </Route>
        <Redirect to='/' />
      </Switch>
    </main>
  </div>
)

};

export default Routes;