import { Button, Grid, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FaceIcon from '@material-ui/icons/Face';
import GradeIcon from '@material-ui/icons/Grade';
import SortIcon from '@material-ui/icons/Sort';
import SubjectIcon from '@material-ui/icons/Subject';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Reaction, Sorting } from './constants';

const PostList = ( { posts, onDelete, onLike, onEdit } ) => {
  const [sortBy, setSortBy] = useState(Sorting.BY_LIKES)

  const location = useLocation();
  const linkNovoPost = { pathname: "/novo-post", state: { categoria: location.pathname.replace('/', '') } };

  const sort = () => {
    const newOrder = sortBy === Sorting.BY_LIKES ? Sorting.BY_DISLIKES : Sorting.BY_LIKES;
    setSortBy(newOrder);
  };

  const sortedPosts = posts.slice().sort((a, b) => {
    return sortBy === Sorting.BY_LIKES ? b.nota - a.nota : a.nota - b.nota;
  });

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item>
          <Button size="small" color="primary" onClick={sort} startIcon={<SortIcon fontSize="small"/>}>
            { sortBy === Sorting.BY_LIKES ? <span>Menos Curtidos</span> : <span>Mais Curtidos</span> }
          </Button>
        </Grid>
        <Grid item>
          <Button size="small" color="secondary" component={Link} to={linkNovoPost} startIcon={<AddCircleIcon fontSize="small"/>} >
            Novo Post
          </Button>
        </Grid>
      </Grid>
      {sortedPosts.map((post) => (
        <div key={post.id} className="post">

          <Grid container spacing={1} direction="row" alignItems="center">
            <Grid item>
              <Grid item className="categoria"><span>{post.categoria}</span></Grid>
            </Grid>
            <Grid item>
              <Grid container className="dataPostagem">
                <Grid item><WatchLaterIcon fontSize="inherit"/></Grid>
                <Grid item><span>{new Date(post.timestamp).toLocaleString('pt-BR')}</span></Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container wrap="nowrap" spacing={1} className="titulo" direction="row" alignItems="center">
            <Grid item><SubjectIcon fontSize="medium"/></Grid>
            <Grid item><span>{post.titulo}</span></Grid>
          </Grid>

          <Grid container spacing={1} className="corpo" direction="row" alignItems="center">
            <Grid item><span>{post.corpo}</span></Grid>
          </Grid>

          <Grid container spacing={1} className="autor" direction="row" alignItems="center">
            <Grid item><FaceIcon fontSize="small"/></Grid>
            <Grid item><span>{post.autor}</span></Grid>
          </Grid>

          <Grid container spacing={1} className="nota" direction="row" alignItems="center">
            <Grid item><GradeIcon fontSize="small"/></Grid>
            <Grid item><span>{post.nota}</span></Grid>
          </Grid>

          <Grid container alignContent="center" justifyContent="flex-start" spacing={1}>
            <IconButton color="primary" component="span" onClick={() => onLike(post.id, Reaction.LIKE)}>
              <ThumbUpIcon fontSize="small"/>
            </IconButton>
            <IconButton color="primary" component="span" onClick={() => onLike(post.id, Reaction.DISLIKE)}>
              <ThumbDownIcon fontSize="small"/>
            </IconButton>
            <IconButton color="primary" component="span" onClick={() => onEdit(post.id)}>
              <EditIcon fontSize="small"/>
            </IconButton>
            <IconButton color="secondary" component="span" onClick={() => onDelete(post.id)}>
              <DeleteIcon fontSize="small"/>
            </IconButton>
          </Grid>
        </div>
      ))}
    </div>
  )
}

export default PostList;
