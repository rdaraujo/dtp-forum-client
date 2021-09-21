import { useState } from 'react';
import { deleteComment, vote, getComentarios, addComment } from '../api/comentarios';
import { Reaction } from './constants';
import { useEffect } from 'react';

export const useComentarios = (postId) => {
  const [ comentarios, setComentarios ] = useState([]);

  useEffect(() => {
    getComentarios(postId).then( comentarios => setComentarios(comentarios) )
  }, [postId]);

  const excludeComment = (id) => {
    deleteComment(id)
      .then( () => {
        setComentarios( comentarios.filter( comentario => comentario.id !== id ))
       } )
      .catch( err => alert(err) )
  };
  
  // const editComment = (postId) => history.push(`/post/${postId}/edit`)

  const reactComment = (id, opcao) => {
    const formData = { opcao };
    const nota = opcao === Reaction.LIKE ? 1 : -1;

    setComentarios(atualizaNota(id, nota));
    
    vote(id, formData).then( comentario => {
      //comentario nao atualizado no backend
      if (!comentario || !comentario.id) {
        setComentarios(atualizaNota(id, nota));
      }
    });
  };
  
  const atualizaNota = (id, nota) => {
    return (
      comentarios.map( comentario => {
        if (comentario.id === id) {
          comentario.nota += nota;
        }
        return comentario;
      })
    )
  };

  const commentPost = (postId, autor, corpo) => {
    const formData = { autor, corpo };

    addComment(postId, formData)
      .then( () => getComentarios(postId).then( comentarios => setComentarios(comentarios) ) )
      .catch( err => alert(err) )
  }

  return { comentarios, excludeComment, reactComment, commentPost };

}