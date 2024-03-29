import * as API from '../api/posts';
import { Reaction } from '../config/constants';

export const LOAD_POSTS = 'LOAD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';

const carregarPostsAction = (dados) => {
  return {
    type: LOAD_POSTS,
    payload: dados,
  };
};

export const carregarPosts = (categoria, pagina, tamanho) => (dispatch) => {
  return API.getPosts(categoria, pagina, tamanho).then((dados) =>
    dispatch(carregarPostsAction(dados))
  );
};

const excluirPostAction = (id) => {
  return {
    type: DELETE_POST,
    id,
  };
};

export const excluirPost = (id) => (dispatch) => {
  return API.deletePost(id).then(() => dispatch(excluirPostAction(id)));
};

const votePostAction = (id, nota) => {
  return {
    type: VOTE_POST,
    payload: { id, nota },
  };
};

export const votePost = (id, opcao) => (dispatch) => {
  const nota = opcao === Reaction.LIKE ? 1 : -1;
  return API.votePost(id, { opcao }).then((post) =>
    dispatch(votePostAction(id, nota))
  );
};
