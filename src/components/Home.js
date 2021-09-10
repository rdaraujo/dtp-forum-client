import { useEffect, useState } from 'react';
import { getPosts } from '../api/posts';
import PostList from './PostList';

const Home = () => {
  const [ posts, setPosts ] = useState([]);

  useEffect(() =>
    getPosts().then( res => setPosts( res.posts )
  ), []);

  return <PostList posts={posts} setPosts={setPosts} />
}

export default Home;
