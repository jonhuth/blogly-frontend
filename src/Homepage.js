import React, { useEffect, useState } from 'react';
import {
  Card, CardBody,
  CardTitle, CardSubtitle, CardFooter
} from 'reactstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTitlesFromAPI, voteOnPostFromAPI } from './actions';
import Pagination from './Pagination';

function Homepage() {
  const titles = useSelector(store => store.titles);
  const dispatch = useDispatch();
  const history = useHistory();

  const { page } = useParams();
  console.log(page);

  const [postsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  
  // useEffect(() => {
  //   if(page){
  //     history.push(`/page/${page}`)
  //   } else {
  //     dispatch(getTitlesFromAPI());
  //   }
  //   history.push('/');
  // }, [dispatch, history, page]);

  useEffect(() => {
    dispatch(getTitlesFromAPI());
    history.push('/');
  }, [dispatch, history]);

  const voteOnPostHelper = (postId, vote) => {
    dispatch(voteOnPostFromAPI(postId, vote));
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTitles = titles.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>WELCOME</h1>

      {currentTitles.sort((a,b) => b.votes - a.votes).map(postPair =>
        <Card key={postPair.id} style={{width: 21.5 + 'em', margin: 0}} className='mx-auto mb-2'>
          <CardBody>
            <CardTitle><Link to={`/${postPair.id}`}>{postPair.title}</Link></CardTitle>
            <CardSubtitle>{postPair.description}</CardSubtitle>
            <CardFooter>
              <p>Net Votes: {postPair.votes}
                <i className="ml-3 fas fa-thumbs-up mr-2 text-success"
                  onClick={() => voteOnPostHelper(postPair.id, 'up')}></i>
                <i className="fas fa-thumbs-down text-danger"
                  onClick={() => voteOnPostHelper(postPair.id, 'down')}></i>
              </p>
              {/* refactor to use same button, make new component */}

            </CardFooter>
          </CardBody>
        </Card>
      )}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={titles.length}
        paginate={paginate}
      />
    </div>
  )
}

export default Homepage;