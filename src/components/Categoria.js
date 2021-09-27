import { useParams } from 'react-router-dom';
import PostList from './PostList';
import { usePosts } from './usePosts';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useState } from 'react';
import { PAGE_SIZE } from '../config/constants';

const Categoria = () => {
  const params = useParams();
  const [ pagina, setPagina ] = useState(1);
  const { posts, total, excludePost, reactPost, editPost } = usePosts(params.categoria, pagina - 1);

  const count = Math.ceil(total / PAGE_SIZE)

  return total > 0 ? (
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <PostList posts={posts} onDelete={excludePost} onLike={reactPost} onEdit={editPost} />
      </Grid>
      <Grid item>
        <Pagination count={count} page={pagina} onChange={ (event, value) => setPagina(value)} />
      </Grid>
    </Grid>
  ) : (
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <Typography variant="button">Não há postagens.</Typography>
      </Grid>
    </Grid>
  )
}

export default Categoria;
