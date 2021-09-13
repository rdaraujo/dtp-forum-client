import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { addPost, getPost, updatePost } from '../api/posts';

const PostForm = () => {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [corpo, setCorpo] = useState('');
  const [categoria, setCategoria] = useState('');

  const history = useHistory();
  const params = useParams();
  
  const voltar = () => history.goBack();
  const home = () => history.push('/');
  
  useEffect(() => {
    if (params.id) {
      getPost(params.id).then( post => {
        setTitulo(post.titulo);
        setAutor(post.autor);
        setCorpo(post.corpo);
        setCategoria(post.categoria);
      })
    }
  }, [params]);

  const postar = (event) => {
    event.preventDefault();
    console.log(params.id);
    const formData = { titulo, autor, corpo, categoria }
    if (params.id) {
      updatePost( params.id, formData ).then(home)
        .catch( err => alert(err));
    } else {
      addPost( formData ).then(home)
        .catch( err => alert(err));
    }
  };

  return (
    <form onSubmit={postar}>
      <h3>Novo Post</h3>
      <br />
      <p>
        <label htmlFor="titulo">Título: </label>
        <input id="titulo" type="text" value={titulo} onChange={ e => setTitulo(e.target.value) } />
      </p>
      <p>
        <label htmlFor="autor">Autor: </label>
        <input id="autor" type="text" value={autor} onChange={ e => setAutor(e.target.value) } />
      </p>
      <p>
        <label htmlFor="categoria">Categoria: </label>
        <input id="categoria" type="text" value={categoria} onChange={ e => setCategoria(e.target.value) } />
      </p>
      <p>
        <label htmlFor="Corpo">Corpo: </label>
        <textarea id="corpo" rows="4" cols="50" value={corpo} onChange={ e => setCorpo(e.target.value) } />
      </p>
      <div>
        <button className="btn btn-danger" onClick={postar}>
          <span className="fas fa-bullhorn"/> Publicar
        </button>
        <button type="button" className="btn btn-primary" onClick={voltar}>
          <span className="fas fa-times" /> Cancelar
        </button>
      </div>
    </form>
  );
}

export default PostForm;
