import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import PostList from './PostList';
import { useEffect } from 'react';
import { loadPosts } from '../actions/posts';
import { getPosts } from '../api/posts';

const Home = () => {
  const { posts, pagina, tamanho, total } = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  const count = Math.ceil(total / tamanho);

  useEffect(() => {
    if (!posts.length) {
      getPosts('', 0, 5).then((res) => {
        dispatch(loadPosts(res));
      });
    }
  }, [dispatch, posts]);

  const handleChangePage = (newPage) => {
    getPosts('', newPage, 5).then((res) => {
      dispatch(loadPosts(res));
    });
  };

  return total > 0 ? (
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <PostList
          posts={posts}
          // onDelete={excludePost}
          // onLike={reactPost}
          // onEdit={editPost}
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
