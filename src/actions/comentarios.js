export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const DELETE_COMMENTS = 'DELETE_COMMENTS';
export const VOTE_COMMENTS = 'VOTE_COMMENTS';

export const loadComentarios = (dados) => {
  return {
    type: LOAD_COMMENTS,
    payload: dados,
  };
};
