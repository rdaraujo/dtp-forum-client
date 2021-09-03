import { SERVER_URL } from './config';

export const getPosts = () => {
  return fetch( `${SERVER_URL}/posts` ).then( (res) => res.json() );
};

export const deletePost = (postId) => {
  return fetch( `${SERVER_URL}/posts/${postId}`, { method: 'DELETE' }).then( (res) => res.json() );
};
