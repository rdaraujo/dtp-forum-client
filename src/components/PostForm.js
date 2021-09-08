import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { addPost } from '../api/posts';

class PostForm extends Component {
  state = {
    titulo: '',
    autor: '',
    corpo: '',
    categoria: '',
  };

  handlePostar = (event) => {
    event.preventDefault();

    addPost(this.state)
      .then(() => this.props.history.push('/'))
      .catch((err) => alert(err));
  };

  handleVoltar = () => {
    this.props.history.goBack();
  };

  handleChange = (campo) => (event) => {
    this.setState({ [campo]: event.target.value });
  };

  render() {
    const { titulo, autor, corpo, categoria } = this.state;

    return (
      <form onSubmit={this.handlePostar}>
        <h3>Novo Post</h3>
        <br/>
        <p>
          <label htmlFor="titulo">Título: </label>
          <input id="titulo" type="text" value={titulo} onChange={this.handleChange('titulo')}/>
        </p>
        <p>
          <label htmlFor="autor">Autor: </label>
          <input id="autor" type="text" value={autor} onChange={this.handleChange('autor')} />
        </p>
        <p>
          <label htmlFor="categoria">Categoria: </label>
          <input id="categoria" type="text" value={categoria} onChange={this.handleChange('categoria')} />
        </p>
        <p>
          <label htmlFor="Corpo">Corpo: </label>
          <textarea id="corpo" rows="4" cols="50" value={corpo} onChange={this.handleChange('corpo')} />
        </p>
        <div>
            <button className="btn btn-danger" onClick={this.handlePostar}>Publicar</button>
            <button className="btn btn-primary" onClick={this.handleVoltar}>Voltar</button>
        </div>
      </form>
    );
  }
}

export default withRouter(PostForm);
