import {
  LOAD_COMMENTS,
  DELETE_COMMENT,
  VOTE_COMMENT,
} from '../actions/comentarios';

const init = [];

const comentariosReducer = (state = init, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      return action.payload;
    case DELETE_COMMENT:
      return [];
    case VOTE_COMMENT:
      return [];
    default:
      return state;
  }
};
