import { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import { getPosts, vote, deletePost } from '../api/posts';
import { Reaction } from "./constants";

export const usePosts = (categoria) => {
  const [ posts, setPosts ] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getPosts(categoria).then( res => setPosts(res.posts) )
  }, [categoria]);

  const excludePost = (postId) => {
    deletePost(postId)
      .then( () => setPosts( posts.filter( post => post.id !== postId )) )
      .catch( err => alert(err) )
  };
  
  const editPost = (postId) => history.push(`/post/${postId}`)

  const reactPost = (postId, opcao) => {
    const formData = { opcao };
    const nota = opcao === Reaction.LIKE ? 1 : -1;

    setPosts(atualizaNota(postId, nota));
    
    vote(postId, formData).then((post) => {
      //post nao atualizado no backend
      if (!post || !post.id) {
        setPosts(atualizaNota(postId, nota));
      }
    });
  };
  
  const atualizaNota = (postId, nota) => {
    return (
      posts.map( post => {
        if (post.id === postId) {
          post.nota += nota;
        }
        return post;
      })
    )
  };

  return { posts, excludePost, reactPost, editPost };

}
