
import { Button, Grid, IconButton, makeStyles, TextField } from '@material-ui/core';
import { Delete, Edit, Face, Grade, Message, Subject, ThumbDown, ThumbUp, WatchLater, AddComment, Clear, ArrowBack } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getPost, votePost, deletePost } from '../api/posts';
import ComentarioList from './ComentarioList';
import { Reaction } from './constants';
import { useComentarios } from './useComentarios';

const PostView = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();

  const { comentarios, excludeComment, reactComment, addOrUpdateComment } = useComentarios(params.postId);
  
  const [ post, setPost ] = useState([]);
  const [ showCommentBox, setShowCommentBox ] = useState(false);
  const [ autor, setAutor ] = useState('');
  const [ corpo, setCorpo ] = useState('');
  const [ comentario, setComentario ] = useState({});

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

  const handleShowCommentBox = () => {
    setShowCommentBox(!showCommentBox)
  }

  const handleComentar = () => {
    addOrUpdateComment(comentario.id, autor, corpo)
    setComentario({})
    setShowCommentBox(false)
    handleClear()
  }

  const handleClear = () => {
    setAutor('')
    setCorpo('')
  }

  const openEdit = (id) => {
    setShowCommentBox(true)
    const comentario = comentarios.find( c => c.id === id)
    setComentario(comentario)
    setAutor(comentario.autor)
    setCorpo(comentario.corpo)
  }

  return (
    <Grid container key={post.id} className={classes.post}>

      <Grid container spacing={1} alignItems="center">
        <Grid item className={classes.categoria}>{post.categoria}</Grid>
        <Grid item className={classes.dataPostagem}><WatchLater fontSize="inherit"/></Grid>
        <Grid item xs={10} className={classes.dataPostagem}>{new Date(post.timestamp).toLocaleString('pt-BR')}</Grid>
      </Grid>

      <Grid container wrap="nowrap" spacing={1} className={classes.titulo} alignItems="center">
        <Grid item><Subject fontSize="medium"/></Grid>
        <Grid item>{post.titulo}</Grid>
      </Grid>

      <Grid container spacing={1} className={classes.corpo} alignItems="center">
        <Grid item>{post.corpo}</Grid>
      </Grid>

      <Grid container spacing={1} className={classes.details} alignItems="center">
        <Grid item><Face fontSize="small"/></Grid>
        <Grid item>{post.autor}</Grid>
        <Grid item><Grade fontSize="small"/></Grid>
        <Grid item>{post.nota}</Grid>
      </Grid>

      <Grid container alignContent="center" justifyContent="flex-start" spacing={1}>
        <IconButton color="primary" component="span" onClick={() => handleReact(Reaction.LIKE)}><ThumbUp fontSize="small"/></IconButton>
        <IconButton color="primary" component="span" onClick={() => handleReact(Reaction.DISLIKE)}><ThumbDown fontSize="small"/></IconButton>
        <IconButton color="primary" component="span" onClick={handleEdit}><Edit fontSize="small"/></IconButton>
        <IconButton color="primary" component="span" onClick={handleShowCommentBox}><AddComment fontSize="inherit"/></IconButton>
        <IconButton color="secondary" component="span" onClick={handleDelete}><Delete fontSize="small"/></IconButton>
        <IconButton color="primary" component="span" onClick={history.goBack}><ArrowBack fontSize="small"/></IconButton>
      </Grid>

      {showCommentBox &&
        <Grid container item spacing={1}>
          <Grid item xs={12}>
            <TextField id="autor" label="Autor" variant="outlined" fullWidth margin="dense" size="small" value={autor} onChange={ event => setAutor(event.target.value) }/>
          </Grid>
          <Grid item xs={12}>
            <TextField id="corpo" label="Corpo" variant="outlined" fullWidth margin="dense" size="small" multiline rows={4} value={corpo} onChange={ event => setCorpo(event.target.value) }/>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" size="small" onClick={handleComentar} startIcon={<Message/>}>Comentar</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" size="small" onClick={handleClear} startIcon={<Clear/>}>Limpar</Button>
          </Grid>
        </Grid>
      }
      <ComentarioList comentarios={comentarios} onDelete={excludeComment} onLike={reactComment} onEdit={openEdit}/>
    </Grid>
  );
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
    padding: '10px',
  },
  details: {
    fontSize: '11px',
    marginLeft: '4px',
    fontWeight: '500',
  },
  categoria: {
    fontSize: '10px',
    borderRadius: '4px',
    color: '#fff',
    backgroundColor: '#b7b7b7',
    marginLeft: '10px',
  },
  dataPostagem: {
    fontSize: '10px',
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

export default PostView;