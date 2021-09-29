import { CircularProgress, Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { excluirPost, loadPosts, votePost } from '../actions/posts';
import * as API from '../api/posts';
import { Reaction } from '../config/constants';
import PostList from './PostList';

const Home = () => {
  const { posts, pagina, tamanho, total } = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const count = Math.ceil(total / tamanho);

  useEffect(() => {
    setLoading(true);
    API.getPosts('', 0, 5)
      .then((res) => dispatch(loadPosts(res)))
      .then(() => setLoading(false));
  }, [dispatch]);

  const excludePost = (id) => {
    dispatch(excluirPost(id));
  };

  const reactPost = (id, opcao) => {
    const nota = opcao === Reaction.LIKE ? 1 : -1;
    API.votePost(id, { opcao }).then((post) => dispatch(votePost(id, nota)));
  };

  const editPost = (id) => {
    history.push(`/post/${id}/edit`);
  };

  const handleChangePage = (newPage) => {
    API.getPosts('', newPage, 5).then((res) => {
      dispatch(loadPosts(res));
    });
  };

  return loading ? (
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  ) : (
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <PostList
          posts={posts}
          onDelete={excludePost}
          onLike={reactPost}
          onEdit={editPost}
        />
      </Grid>
      <Grid item>
        <Pagination
          count={count}
          page={pagina + 1}
          onChange={(event, value) => handleChangePage(value - 1)}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
