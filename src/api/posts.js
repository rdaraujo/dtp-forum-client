import { SERVER_URL, headers } from './config';

export const getPosts = (categoria = '') => {
  return fetch(`${SERVER_URL}/posts?categoria=${categoria}&tamanho=99`).then( res => res.json());
};

export const getPost = (id) => {
  return fetch(`${SERVER_URL}/posts/${id}`).then( res => res.json());
};

export const deletePost = (postId) => {
  return fetch(`${SERVER_URL}/posts/${postId}`, { method: 'DELETE' }).then( res => res.json() );
};

export const addPost = (formData) => {
  const post = {
    method: 'POST',
    headers,
    body: JSON.stringify(formData),
  };
  
  return fetch(`${SERVER_URL}/posts`, post).then( res => res.json())
    .catch((err) => console.log(err));
}

export const vote = (postId, formData) => {
  const put = {
    method: 'PUT',
    headers,
    body: JSON.stringify(formData),
  };

  return fetch(`${SERVER_URL}/posts/${postId}/votar`, put).then( res => res.json())
    .catch((err) => console.log(err));
};

export const updatePost = (postId, formData) => {
  const put = {
    method: 'PUT',
    headers,
    body: JSON.stringify(formData),
  };

  return fetch(`${SERVER_URL}/posts/${postId}`, put).then( res => res.json())
    .catch((err) => console.log(err));
};
