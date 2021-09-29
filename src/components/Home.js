import { CircularProgress, Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { carregarPosts, excluirPost, votePost } from '../actions/posts';
import PostList from './PostList';

const Home = () => {
  const { posts, pagina, tamanho, total } = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const count = Math.ceil(total / tamanho);

  useEffect(() => {
    setLoading(true);
    dispatch(carregarPosts('', 0, 5)).finally(() => setLoading(false));
  }, [dispatch]);

  const excludePost = (id) => {
    dispatch(excluirPost(id));
  };

  const reactPost = (id, opcao) => {
    dispatch(votePost(id, opcao));
  };

  const editPost = (id) => {
    history.push(`/post/${id}/edit`);
  };

  const handleChangePage = (newPage) => {
    dispatch(carregarPosts('', newPage, 5));
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
