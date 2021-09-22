import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useState } from 'react';
import { getAllPosts } from '../api/posts';
import { PAGE_SIZE } from './constants';
import PostList from './PostList';
import { usePosts } from './usePosts';

const Home = () => {
  const [ pagina, setPagina ] = useState(1);
  const [ totalCount, setTotalCount ] = useState(0);
  
  const { posts, excludePost, reactPost, editPost } = usePosts('', pagina - 1);

  getAllPosts().then( res => setTotalCount(res.posts.length))

  const count = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <Grid>
      <Pagination count={count} page={pagina} onChange={ (event, value) => setPagina(value)} />
      <PostList posts={posts} onDelete={excludePost} onLike={reactPost} onEdit={editPost} />
    </Grid>
  )
}

export default Home;
