import React from 'react';
import {deleteComment} from './actions';
import { useSelector, useDispatch } from 'react-redux';

function CommentView({postId}) {
  const dispatch = useDispatch();
  const comments = useSelector(store => store.posts[postId].comments);
  const deleteCommentHelper = (postId, commentId) => {
    dispatch(deleteComment(postId, commentId));
  }

  
  return (
    <div>
      <h5>Comments</h5>
      {comments && comments.map(commentObj =>
        <div key={commentObj.id}>
          <p>{commentObj.text} <i className="ml-3 fas fa-trash text-danger" style={{fontSize: 20 + 'px'}} 
            onClick={() => deleteCommentHelper(postId, commentObj.id)}></i></p>
          
        </div>
      )}
    </div>
  )
}

export default CommentView;