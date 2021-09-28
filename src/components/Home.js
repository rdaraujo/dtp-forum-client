import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import PostList from './PostList';
import { useEffect } from 'react';
import { loadPosts, deletePost, votePost } from '../actions/posts';
import * as API from '../api/posts';
import { Reaction } from '../config/constants';
import { useHistory } from 'react-router';

const Home = () => {
  const { posts, pagina, tamanho, total } = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  const history = useHistory();

  const count = Math.ceil(total / tamanho);

  useEffect(() => {
    API.getPosts('', 0, 5).then((res) => dispatch(loadPosts(res)));
  }, [dispatch]);

  const excludePost = (id) => {
    API.deletePost(id).then(() => dispatch(deletePost(id)));
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

  return total > 0 ? (
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
  ) : (
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <Typography variant="button">Não há postagens.</Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
