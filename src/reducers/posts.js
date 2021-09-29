import { LOAD_POSTS, DELETE_POST, VOTE_POST } from '../actions/posts';

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
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.id),
      };
    case VOTE_POST:
      const post = state.posts.find((post) => post.id === action.payload.id);
      const nota = post.nota + action.payload.nota;

      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.payload.id ? { ...post, nota } : p
        ),
      };

    default:
      return state;
  }
};

export default postsReducer;
