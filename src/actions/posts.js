export const LOAD_POSTS = 'LOAD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';

export const loadPosts = (dados) => {
  return {
    type: LOAD_POSTS,
    payload: dados,
  };
};

export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    payload: id,
  };
};

export const votePost = (id, nota) => {
  return {
    type: VOTE_POST,
    payload: { id, nota },
  };
};