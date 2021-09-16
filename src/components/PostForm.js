import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router';
import { addPost, getPost, updatePost } from '../api/posts';

import { Cancel, PostAdd } from '@material-ui/icons';

const PostForm = () => {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [corpo, setCorpo] = useState('');
  const [categoria, setCategoria] = useState('');

  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  
  const goBack = () => history.goBack();
  const goHome = () => history.push('/');
  
  useEffect(() => {
    if (location && location.state) {
      setCategoria(location.state.categoria);
    }
    if (params.postId) {
      getPost(params.postId).then( post => {
        setTitulo(post.titulo);
        setAutor(post.autor);
        setCorpo(post.corpo);
        setCategoria(post.categoria);
      })
    }
  }, [params, location]);

  const createPost = (event) => {
    event.preventDefault();
    
    const formData = { titulo, autor, corpo, categoria }
    if (params.postId) {
      updatePost( params.postId, formData ).then(goHome)
        .catch( err => alert(err));
    } else {
      addPost( formData ).then(goHome)
        .catch( err => alert(err));
    }
  };

  return (
    <form onSubmit={createPost}>
      <Typography variant='h6'>Novo Post</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TextField id="titulo" label="Título" variant="outlined" fullWidth margin="dense" size="small" value={titulo} onChange={ event => setTitulo(event.target.value) }/>
        </Grid>
        <Grid item xs={12} md={8}>
        < TextField id="autor" label="Autor" variant="outlined" fullWidth margin="dense" size="small" value={autor} onChange={ event => setAutor(event.target.value) }/>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField id="categoria" label="Categoria" variant="outlined" fullWidth margin="dense" size="small" value={categoria} onChange={ event => setCategoria(event.target.value) }/>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField id="corpo" label="Corpo" variant="outlined" fullWidth margin="dense" size="small" multiline rows={4} value={corpo} onChange={ event => setCorpo(event.target.value) }/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <Button size="small" color="primary" onClick={createPost}><PostAdd fontSize="small"/>Publicar</Button>
        </Grid>
        <Grid item>
          <Button size="small" color="secondary" onClick={goBack}><Cancel fontSize="small"/>Cancelar</Button>
        </Grid>
      </Grid>
    </form>
  )

}

export default PostForm;
