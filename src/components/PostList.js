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
      <Grid container spacing={1}>
        <Grid item>
          <Button size="small" color="primary" onClick={sort} startIcon={<Sort fontSize="small"/>}>
            { sortBy === Sorting.BY_LIKES ? <span>Menos Curtidos</span> : <span>Mais Curtidos</span> }
          </Button>
        </Grid>
        <Grid item>
          <Button size="small" color="secondary" component={Link} to={linkNovoPost} startIcon={<AddCircle fontSize="small"/>} >
            Novo Post
          </Button>
        </Grid>
      </Grid>
      {sortedPosts.map( post => (
        <div key={post.id} className={classes.post}>

          <Grid container spacing={1} direction="row" alignItems="center">
            <Grid item>
              <Grid item className={classes.categoria} component={Link} to={`/${post.categoria}`}><span>{post.categoria}</span></Grid>
            </Grid>
            <Grid item>
              <Grid container className={classes.dataPostagem} alignItems="center">
                <Grid item><WatchLater fontSize="inherit"/></Grid>
                <Grid item><span>{new Date(post.timestamp).toLocaleString('pt-BR')}</span></Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container wrap="nowrap" spacing={1} className={classes.titulo} direction="row" alignItems="center">
            <Grid item><Subject fontSize="medium"/></Grid>
            <Grid item component={Link} to={`/post/${post.id}`}><span>{post.titulo}</span></Grid>
          </Grid>

          <Grid container spacing={1} className={classes.autor} direction="row" alignItems="center">
            <Grid item><Face fontSize="small"/></Grid>
            <Grid item><span>{post.autor}</span></Grid>
          </Grid>

          <Grid container spacing={1} className={classes.nota} direction="row" alignItems="center">
            <Grid item><Grade fontSize="small"/></Grid>
            <Grid item><span>{post.nota}</span></Grid>
          </Grid>

          <Grid container spacing={1} className={classes.numeroComentarios} direction="row" alignItems="center">
            <Grid item><Message fontSize="small"/></Grid>
            <Grid item><span>{post.numeroComentarios}</span></Grid>
          </Grid>

          <Grid container alignContent="center" justifyContent="flex-start" spacing={1}>
            <IconButton color="primary" component="span" onClick={() => onLike(post.id, Reaction.LIKE)}>
              <ThumbUp fontSize="inherit"/>
            </IconButton>
            <IconButton color="primary" component="span" onClick={() => onLike(post.id, Reaction.DISLIKE)}>
              <ThumbDown fontSize="inherit"/>
            </IconButton>
            <IconButton color="primary" component="span" onClick={() => onEdit(post.id)}>
              <Edit fontSize="inherit"/>
            </IconButton>
            <IconButton color="secondary" component="span" onClick={() => onDelete(post.id)}>
              <Delete fontSize="inherit"/>
            </IconButton>
          </Grid>
        </div>
      ))}
    </div>
  ) : (
    <Typography>Não há postagens.</Typography>
  )
}

const useStyles = makeStyles( theme => ({
  titulo: {
    fontSize: '14px',
    margin: '5px 5px 5px auto',
    fontWeight: '500',
    paddingTop: 'inherit',
  },
  corpo: {
    fontSize: '13px',
    fontWeight: 'lighter',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  autor: {
    fontSize: '11px',
    margin: '2px 2px 2px auto',
    fontWeight: '500',
  },
  nota: {
    fontSize: '11px',
    margin: '2px 2px 2px auto',
    fontWeight: '500',
  },
  numeroComentarios: {
    fontSize: '11px',
    margin: '2px 2px 2px auto',
    fontWeight: '500',
  },
  categoria: {
    padding: '3px 8px',
    fontSize: '10px',
    borderRadius: '4px',
    border: 'none',
    color: '#fff',
    backgroundColor: '#b7b7b7',
    textDecorationStyle: '-moz-none',
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
    margin: '10px 15px 15px auto',
    padding: '10px',
  },
}))

export default PostList;
