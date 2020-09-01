import React, { useState, useEffect } from 'react';
import PostForm from './Form';
import PostView from './PostView';
import CommentView from './CommentView';
import CommentForm from './CommentForm';

import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getPostFromAPI, deletePostFromAPI, voteOnPostFromAPI } from './actions';

function Post() {
  const [isEditing, setIsEditing] = useState(false);

  const { postId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const deletePostHelper = postId => {
    dispatch(deletePostFromAPI(postId));
    history.push('/');
  }

  const posts = useSelector(store => store.posts);
  let post = posts[postId];

  useEffect(function getPostWhenMounted() {
    async function getPost() {
      dispatch(getPostFromAPI(postId))
    }
    getPost();
  }, [dispatch, postId]);
  // useEffect(() => {
  //   dispatch(getTitleFromAPI(postId)) 
  // }, [dispatch, postId]);

  const voteOnPostHelper = (postId, vote) => {
    dispatch(voteOnPostFromAPI(postId, vote));
  }

  if (post) {
    return (
      <div>
        {isEditing ? <PostForm postId={postId} />
          :
          <>
            <PostView post={post} />
            <div>
              <i className="fas fa-eraser text-info mr-2" style={{fontSize: 25 + 'px'}} 
                onClick={() => { setIsEditing(true) }}></i>
              <i className="fas fa-trash text-danger" style={{fontSize: 25 + 'px'}} 
                onClick={() => deletePostHelper(postId)}></i>
              <p>Net Votes: {post.votes}</p>
              <i className="fas fa-thumbs-up mr-2 text-success" style={{fontSize: 25 + 'px'}} 
                onClick={() => voteOnPostHelper(post.id, 'up')}></i>
              <i className="fas fa-thumbs-down text-danger" style={{fontSize: 25 + 'px'}} 
                onClick={() => voteOnPostHelper(post.id, 'down')}></i>
            </div>
            <hr />
            <CommentView postId={postId} />
            <CommentForm postId={postId} />
          </>

        }
      </div>
    )
  } else {
    return null;
  }

}

export default Post;