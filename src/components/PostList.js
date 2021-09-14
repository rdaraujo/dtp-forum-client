import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Reaction, Sorting } from './constants';

import { Button, Grid, IconButton } from '@material-ui/core';

import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SortIcon from '@material-ui/icons/Sort';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ChatIcon from '@material-ui/icons/Chat';
import FaceIcon from '@material-ui/icons/Face';
import GradeIcon from '@material-ui/icons/Grade';

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
          <Button size="small" variant="contained" color="primary" onClick={sort}>
            <SortIcon fontSize="small"/>
            { sortBy === Sorting.BY_LIKES ? <span>Menos Curtidos</span> : <span>Mais Curtidos</span> }
          </Button>
        </Grid>
        <Grid item>
          <Button size="small" variant="contained" color="secondary" component={Link} to={linkNovoPost} >
            <AddCircleIcon fontSize="small"/>Novo Post
          </Button>
        </Grid>
      </Grid>
      {sortedPosts.map((post) => (
        <div key={post.id} className="post">

          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <span className="categoria">{post.categoria}</span>
            </Grid>
            <Grid item className="dataPostagem">
              <WatchLaterIcon fontSize="inherit"/>
            </Grid>
            <Grid item className="dataPostagem">
              {new Date(post.timestamp).toLocaleString('pt-BR')}
            </Grid>
          </Grid>

          <h3><ChatIcon fontSize="inherit"/>{post.titulo}</h3>
          <h5>{post.corpo}</h5>
          <h6><FaceIcon fontSize="inherit"/> {post.autor}</h6>
          <h6><GradeIcon fontSize="inherit"/> Nota: {post.nota}</h6>
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
