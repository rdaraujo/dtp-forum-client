import { SERVER_URL, headers } from './config';

export const getComentarios = (postId) => {
  return fetch(`${SERVER_URL}/comentarios/${postId}`).then( res => res.json());
};

export const addComment = (postId, formData) => {
  const post = {
    method: 'POST',
    headers,
    body: JSON.stringify(formData),
  };
  
  return fetch(`${SERVER_URL}/comentarios/${postId}`, post).then( res => res.json())
    .catch((err) => console.log(err));
}

export const deleteComment = (id) => {
  return fetch(`${SERVER_URL}/comentarios/${id}`, { method: 'DELETE' }).then( res => res.json() );
};

export const voteComment = (id, formData) => {
  const put = {
    method: 'PUT',
    headers,
    body: JSON.stringify(formData),
  };

  return fetch(`${SERVER_URL}/comentarios/${id}/votar`, put).then( res => res.json())
    .catch((err) => console.log(err));
};

export const updateComment = (id, formData) => {
  const put = {
    method: 'PUT',
    headers,
    body: JSON.stringify(formData),
  };

  return fetch(`${SERVER_URL}/comentarios/${id}`, put).then( res => res.json())
    .catch((err) => console.log(err));
};
