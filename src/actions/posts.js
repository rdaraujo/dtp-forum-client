export const LOAD_POSTS = 'LOAD_POSTS';

export const loadPosts = (dados) => {
  return {
    type: LOAD_POSTS,
    payload: dados,
  };
};
