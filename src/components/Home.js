import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useState } from 'react';
import { PAGE_SIZE } from './constants';
import PostList from './PostList';
import { usePosts } from './usePosts';

const Home = () => {
  const [ pagina, setPagina ] = useState(1);
  
  const { posts, total, excludePost, reactPost, editPost } = usePosts('', pagina - 1);

  const count = Math.ceil(total / PAGE_SIZE)
  
  return total > 0 ? (
    <Grid>
      <Pagination count={count} page={pagina} onChange={ (event, value) => setPagina(value)} />
      <PostList posts={posts} onDelete={excludePost} onLike={reactPost} onEdit={editPost} />
    </Grid>
  ) : (
    <Typography variant="button">Não há postagens.</Typography>
  )
}

export default Home;
