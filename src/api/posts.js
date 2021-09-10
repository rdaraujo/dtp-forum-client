import { SERVER_URL } from './config';

export const getPosts = (categoria = '') => {
  return fetch(`${SERVER_URL}/posts?categoria=${categoria}`).then( res => res.json());
};

export const deletePost = (postId) => {
  return fetch(`${SERVER_URL}/posts/${postId}`, { method: 'DELETE' }).then(
    (res) => res.json()
  );
};

export const addPost = (formData) => {
  const post = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(formData),
  };
  
  return fetch(`${SERVER_URL}/posts`, post)
  .then((res) => res.json())
  .catch((err) => console.log(err));
  
}

export const vote = (postId, formData) => {
  const put = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(formData),
  };

  return fetch(`${SERVER_URL}/posts/${postId}/votar`, put)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
