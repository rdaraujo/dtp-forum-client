import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deletePost, getPosts, vote } from '../api/posts';
import { Reaction } from './constants';
import PostList from './PostList';

const Categoria = () => {

  const [ posts, setPosts ] = useState([]);
  const params = useParams();

  useEffect( () => {
    getPosts().then((res) => {
      setPosts(res.posts.filter((post) => post.categoria === params.categoria));
    })
  }, [params]);
  
  const handleDelete = (postId) => {
    deletePost(postId)
      .then( () => setPosts( posts.filter( post => post.id !== postId) ) )
      .catch( (err) => alert(err) );
  };

  const handleReaction = (postId, reaction) => {
    const formData = { opcao: reaction };
    const nota = reaction === Reaction.LIKE ? 1 : -1;

    const posts = atualizaPost(postId, nota);
    setPosts(posts);
    
    vote(postId, formData).then((post) => {
      //post nao atualizado no backend
      if (!post || !post.id) {
        const posts = atualizaPost(postId, nota);
        setPosts(posts);
      }
    });
  };
  
  const atualizaPost = (postId, nota) => {
    return (
      posts.map( post => {
        if (post.id === postId) {
          post.nota += nota;
        }
        return post;
      })
    )
  };

  return (
    <div>
      <h3>{params.categoria}: {posts.length}</h3>
      <PostList posts={posts} onDelete={handleDelete} onLike={handleReaction} />
    </div>
  );
}

export default Categoria;
