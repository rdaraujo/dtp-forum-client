import { Button, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Reaction, Sorting } from './constants';
import { AddCircle, Delete, Edit, Face, Grade, Sort, Subject, ThumbDown, ThumbUp, WatchLater, Message } from '@material-ui/icons';

const PostList = ( { posts, onDelete, onLike, onEdit } ) => {
  const [ sortBy, setSortBy ] = useState(Sorting.BY_LIKES)

  const location = useLocation();
  const linkNovoPost = { pathname: "/novo-post", state: { categoria: location.pathname.replace('/', '') } };

  const classes = useStyles()

  const sort = () => {
    const newOrder = sortBy === Sorting.BY_LIKES ? Sorting.BY_DISLIKES : Sorting.BY_LIKES;
    setSortBy(newOrder);
  };

  const sortedPosts = posts.slice().sort((a, b) => {
    return sortBy === Sorting.BY_LIKES ? b.nota - a.nota : a.nota - b.nota;
  });

  return posts.length ? (
    <div>
      <Grid container>
        <Grid item>
          <Button size="small" color="primary" onClick={sort} startIcon={<Sort fontSize="small"/>}>
            { sortBy === Sorting.BY_LIKES ? <span>Menos Curtidos</span> : <span>Mais Curtidos</span> }
          </Button>
        </Grid>
        <Grid item>
          <Button size="small" color="secondary" component={Link} to={linkNovoPost} startIcon={<AddCircle fontSize="small"/>}>Novo Post</Button>
        </Grid>
      </Grid>
      {sortedPosts.map( post => (
        <div key={post.id} className={classes.post}>
          <Grid container spacing={1} alignItems="center">
            <Grid item className={classes.categoria} component={Link} to={`/${post.categoria}`}>{post.categoria}</Grid>
            <Grid item className={classes.dataPostagem}><WatchLater fontSize="inherit"/></Grid>
            <Grid item xs={10} className={classes.dataPostagem}>{new Date(post.timestamp).toLocaleString('pt-BR')}</Grid>
          </Grid>

          <Grid container spacing={1} wrap="nowrap" alignItems="center" className={classes.titulo}>
            <Grid item component={Link} to={`/${post.categoria}/${post.id}`}><Subject fontSize="small"/></Grid>
            <Grid item>{post.titulo}</Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center" className={classes.details}>
            <Grid item><Face fontSize="small"/></Grid>
            <Grid item>{post.autor}</Grid>
            <Grid item><Grade fontSize="small"/></Grid>
            <Grid item>{post.nota}</Grid>
            <Grid item><Message fontSize="small"/></Grid>
            <Grid item>{post.numeroComentarios}</Grid>
          </Grid>

          <Grid container>
            <IconButton color="primary" size="small" component="span" onClick={() => onLike(post.id, Reaction.LIKE)}><ThumbUp fontSize="small"/></IconButton>
            <IconButton color="primary" size="small" component="span" onClick={() => onLike(post.id, Reaction.DISLIKE)}><ThumbDown fontSize="small"/></IconButton>
            <IconButton color="primary" size="small" component="span" onClick={() => onEdit(post.id)}><Edit fontSize="small"/></IconButton>
            <IconButton color="secondary" size="small" component="span" onClick={() => onDelete(post.id)}><Delete fontSize="small"/></IconButton>
          </Grid>
        </div>
      ))}
    </div>
  ) : (
    <Typography variant="button">Não há postagens.</Typography>
  )
}

const useStyles = makeStyles( theme => ({
  titulo: {
    fontSize: '14px',
    fontWeight: '500',
  },
  details: {
    fontSize: '11px',
    fontWeight: '500',
  },
  categoria: {
    fontSize: '10px',
    borderRadius: '4px',
    color: '#fff',
    backgroundColor: '#b7b7b7',
    textDecorationStyle: '-moz-none',
    margin: '5px',
  },
  dataPostagem: {
    padding: '6px auto 6px auto',
    fontSize: '10px',
    border: 'none',
    color: 'gray',
  },
  post: {
    backgroundColor: '#eef5ff',
    borderRadius: '10px',
    border: 'none',
    margin: '5px 15px 5px auto',
    padding: '8px',
  },
}))

export default PostList;
