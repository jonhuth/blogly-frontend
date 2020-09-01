import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import { addPostToAPI, editPostToAPI } from './actions'

import * as Yup from "yup";

import { useDispatch } from 'react-redux';

function PostForm({postId}){
  const dispatch = useDispatch();
  // const updatePostHelper = postData => dispatch(updatePost(postId, postData));
  const history = useHistory();

  const validationSchema = Yup.object({
    title : Yup.string().required(),
    description : Yup.string().required(),
    body : Yup.string().required()
  });

  return (
    <div>
      <Formik initialValues={{ title:'', description:'', body:'' }}
              validationSchema={validationSchema}
              onSubmit={(data) => {
                postId ? dispatch(editPostToAPI(postId, data)) : dispatch(addPostToAPI(data));
                history.push('/');
      }}>
        {({ values, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="col-xs-4 mb-2">
              <Field name="title"
                    as="input"
                    placeholder="title"
              />
            </div>
            <div className="col-xs-4 mb-2">
              <Field name="description"
                    as="input"
                    placeholder="description"
              />
            </div>
            <div className="col-xs-4 mb-2">
              <Field name="body"
                    as="textarea"
                    placeholder="body"
              />
            </div>
            <div>
              <button type="submit">POST</button>
              <button onClick={() => history.push('/')} type="click">CANCEL</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
};

export default PostForm;