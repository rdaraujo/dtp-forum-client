import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts } from '../api/posts';
import PostList from './PostList';

const Categoria = () => {
  const [ posts, setPosts ] = useState([]);
  const params = useParams();

  // useEffect( () => {
  //   getPosts().then( res => {
  //     setPosts(res.posts.filter( post => post.categoria === params.categoria));
  //   })
  // }, [params]);

  useEffect( () =>
    getPosts(params.categoria).then( res => setPosts( res.posts )
  ), [params]);
  
  return (
    <div>
      <h3>{params.categoria}: {posts.length}</h3>
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  );
}

export default Categoria;
