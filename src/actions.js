import {
  ADD_POST, DELETE_POST, UPDATE_POST, VOTE_ON_POST,
  ADD_COMMENT, DELETE_COMMENT, GET_TITLES,
  GET_POST
} from './actionTypes';

import axios from 'axios';

const apiUrlPrefix = 'https://blogly.herokuapp.com/api' || 'http://localhost:5000/api';

//post will be obj with: title, description & body keys
//we are expecting postId to be a generated uuid
export function addPost(postData) {
  return {
    type: ADD_POST,
    // postId,
    postData
  }
}
export function deletePost(postId) {
  return {
    type: DELETE_POST,
    postId
  }
}
export function updatePost(postId, postData) {
  return {
    type: UPDATE_POST,
    postId,
    postData
  }
}

// voting
export function voteOnPost(postId, newVotesCount) {
  return {
    type: VOTE_ON_POST,
    postId,
    newVotesCount
  }
}
export function voteOnPostFromAPI(postId, vote) {
  return async function(dispatch) {
    let response = await axios.post(`${apiUrlPrefix}/posts/${postId}/vote/${vote}`);
    dispatch(voteOnPost(postId, response.data.votes));
  }
}
//

// takes postId and add comment to that post
export function addComment(postId, commentObj) {
  return {
    type: ADD_COMMENT,
    postId,
    commentObj
  }
}
export function deleteComment(postId, commentId) {
  return {
    type: DELETE_COMMENT,
    postId,
    commentId
  }
}

// APIs

export function getTitlesFromAPI() {
  return async function(dispatch) {
    let response = await axios.get(`${apiUrlPrefix}/posts`);
    dispatch(getTitles(response.data));
  };
}

function getTitles(titles) {
  return { type: GET_TITLES, titles };
}

export function getPostFromAPI(id){
  return async function(dispatch) {
    let response = await axios.get(`${apiUrlPrefix}/posts/${id}`);
    dispatch(getPost(response.data));
  };
}

function getPost(post) {
  return { type: GET_POST, post}
}

export function addPostToAPI(data){
  return async function(dispatch) {
    let response = await axios.post(`${apiUrlPrefix}/posts`, data);
    dispatch(addPost(response.data));
  }
}

export function editPostToAPI(id, data){
  return async function(dispatch) {
    let response = await axios.put(`${apiUrlPrefix}/posts/${id}`, data);
    dispatch(updatePost(response.data));
  }
}

export function deletePostFromAPI(id){
  return async function(dispatch) {
    await axios.delete(`${apiUrlPrefix}/posts/${id}`);
    dispatch(deletePost(id));
  }
}

export function addCommentToAPI(postId, data) {
  return async function(dispatch) {
    let response = await axios.post(`${apiUrlPrefix}/posts/${postId}/comments`, data);
    dispatch(addComment(postId, response.data));
  }
}

export function deleteCommentFromAPI(postId, commentId) {
  return async function(dispatch) {
    await axios.delete(`${apiUrlPrefix}/posts/${postId}/comments/${commentId}`);
    dispatch(deleteComment(postId, commentId));
  }
}
