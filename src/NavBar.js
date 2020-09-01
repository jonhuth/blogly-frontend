import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Jumbotron } from "reactstrap";

function NavBar() {

  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">BLOGLY</h1>
        <h3 className="lead">BLOG BLOG BLOG</h3>
        <Link exact="true" to='/'><p className="lead">Blog</p></Link>
        <Link exact="true" to='/new'><p className="lead">New Post</p></Link>
      </Jumbotron>
      <hr className="my-2" />
    </div>
  )
}

export default NavBar;
