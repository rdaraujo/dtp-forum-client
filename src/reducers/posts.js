import { LOAD_POSTS } from '../actions/posts';

const init = {
  posts: [],
  pagina: 0,
  tamanho: 5,
  total: 0,
};

const postsReducer = (state = init, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return action.payload;
    default:
      return state;
  }
};

export default postsReducer;
