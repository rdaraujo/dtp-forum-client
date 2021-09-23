export const Sorting = {
  BY_DISLIKES: 'BY_DISLIKES',
  BY_LIKES: 'BY_LIKES',
  BY_DATE_ASC: 'BY_DATE_ASC',
  BY_DATE_DESC: 'BY_DATE_DESC',
}

export const Reaction = {
  LIKE: 'positivo',
  DISLIKE: 'negativo'
}

export const PAGE_SIZE = 5

export const userLogged = () => {
  return localStorage.getItem('token') ? true : false
}
