import React from 'react';

function PostView( { post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <h3>{post.description}</h3>
      <p>{post.body}</p>
    </div>
  )
}

export default PostView;