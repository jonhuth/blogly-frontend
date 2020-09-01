import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentToAPI } from './actions';

function CommentForm({ postId }) {
  const [formData, setFormData] = useState(''); 

  const dispatch = useDispatch();
  const addCommentHelper = comment => dispatch(addCommentToAPI(postId, {text: comment}));

  const handleChange = evt => {
    setFormData(evt.target.value);
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    addCommentHelper(formData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <input type="text" name="text" />
        <button type="submit">POST</button>
      </form>
    </div>
  )
}

export default CommentForm;