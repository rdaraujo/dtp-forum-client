
import { Button, Grid, IconButton, makeStyles, TextField } from '@material-ui/core';
import { Delete, Edit, Face, Grade, Message, Subject, ThumbDown, ThumbUp, WatchLater, AddComment } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getPost, votePost, deletePost } from '../api/posts';
import ComentarioList from './ComentarioList';
import { Reaction } from './constants';
import { useComentarios } from './useComentarios';

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

const PostView = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();

  const { comentarios, excludeComment, reactComment, commentPost } = useComentarios(params.postId);
  
  const [ post, setPost ] = useState([]);
  const [ showCommentBox, setShowCommentBox ] = useState(false);
  const [ autor, setAutor ] = useState('');
  const [ corpo, setCorpo ] = useState('');

  useEffect(() => {
    if (params.postId) {
      getPost(params.postId).then( res => setPost(res) )
    }
  }, [params]);

  const handleEdit = () => {
    history.push(`/post/${post.id}/edit`)
  }

  const handleDelete = () => {
    deletePost(post.id)
      .then( () => setPost({}) )
      .then( () => history.goBack() )
      .catch( err => alert(err) )
  }

  const handleReact = (opcao) => {
    const formData = { opcao };
    const nota = opcao === Reaction.LIKE ? 1 : -1;

    atualizaNota(nota)
    
    votePost(post.id, formData).then((post) => {
      //post nao atualizado no backend
      if (!post || !post.id) {
        atualizaNota(nota)
      }
    });
  };
  
  const atualizaNota = (nota) => {
    const novaNota = post.nota + nota
    setPost({ ...post, nota: novaNota })
  };

  const handleShowCommentBox = (postId) => {
    setShowCommentBox(!showCommentBox)
  }

  const handleComment = (postId) => {
    commentPost(postId, autor, corpo)
    setShowCommentBox(false)
    setAutor('')
    setCorpo('')
  }

  return (
    <div key={post.id} className={classes.post}>

      <Grid container spacing={1} direction="row" alignItems="center">
        <Grid item>
          <Grid item className={classes.categoria}><span>{post.categoria}</span></Grid>
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
        <Grid item><span>{post.titulo}</span></Grid>
      </Grid>

      <Grid container spacing={1} className={classes.corpo} direction="row" alignItems="center">
        <Grid item><span>{post.corpo}</span></Grid>
      </Grid>

      <Grid container spacing={1} className={classes.autor} direction="row" alignItems="center">
        <Grid item><Face fontSize="small"/></Grid>
        <Grid item><span>{post.autor}</span></Grid>
      </Grid>

      <Grid container spacing={1} className={classes.nota} direction="row" alignItems="center">
        <Grid item><Grade fontSize="small"/></Grid>
        <Grid item><span>{post.nota}</span></Grid>
      </Grid>

      <Grid container alignContent="center" justifyContent="flex-start" spacing={1}>
        <IconButton color="primary" component="span" onClick={() => handleReact(Reaction.LIKE)}>
          <ThumbUp fontSize="small"/>
        </IconButton>
        <IconButton color="primary" component="span" onClick={() => handleReact(Reaction.DISLIKE)}>
          <ThumbDown fontSize="small"/>
        </IconButton>
        <IconButton color="primary" component="span" onClick={handleEdit}>
          <Edit fontSize="small"/>
        </IconButton>
        <IconButton color="primary" component="span" onClick={handleShowCommentBox}>
          <AddComment fontSize="inherit"/>
        </IconButton>
        <IconButton color="secondary" component="span" onClick={handleDelete}>
          <Delete fontSize="small"/>
        </IconButton>
      </Grid>

      <Grid container>
        {showCommentBox &&
          <Grid container>
            <Grid item xs={12} md={12}>
              <TextField id="autor" label="Autor" variant="outlined" fullWidth margin="dense" size="small" value={autor} onChange={ event => setAutor(event.target.value) }/>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField id="corpo" label="Corpo" variant="outlined" fullWidth margin="dense" size="small" multiline rows={4} value={corpo} onChange={ event => setCorpo(event.target.value) }/>
            </Grid>
            <Grid item xs={12} md={12}>
              <Button variant="outlined" color="primary" size="small" onClick={() => handleComment(post.id)} startIcon={<Message/>}>Comentar</Button>
            </Grid>
          </Grid>
        }
        <ComentarioList comentarios={comentarios} onDelete={excludeComment} onLike={reactComment}/>
      </Grid>
    </div>
  );
}

export default PostView;