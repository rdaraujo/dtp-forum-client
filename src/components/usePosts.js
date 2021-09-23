import { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import { getPosts, votePost, deletePost } from '../api/posts';
import { Reaction } from "./constants";

export const usePosts = (categoria, pagina) => {
  const [ posts, setPosts ] = useState([]);
  const [ total, setTotal ] = useState(0);
  const history = useHistory();

  useEffect(() => {
    getPosts(categoria, pagina).then( res => {
      setPosts(res.posts)
      setTotal(res.total)
    })
  }, [categoria, pagina]);

  const excludePost = (postId) => {
    deletePost(postId)
      .then( () => {
        setPosts( posts.filter( post => post.id !== postId ))
       } )
      .catch( err => alert(err) )
  };
  
  const editPost = (postId) => history.push(`/post/${postId}/edit`)

  const reactPost = (postId, opcao) => {
    const formData = { opcao };
    const nota = opcao === Reaction.LIKE ? 1 : -1;

    setPosts(atualizaNota(postId, nota));
    
    votePost(postId, formData).then((post) => {
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

  return { posts, total, excludePost, reactPost, editPost };

}
