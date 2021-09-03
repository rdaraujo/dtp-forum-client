import { Component } from 'react';
import { Sorting } from './constantes';

class PostList extends Component {
  state = {
    sortBy: Sorting.NEWER,
  };

  handleSorting = () => {
    const newOrder = this.state.sortBy === Sorting.NEWER ? Sorting.OLDER : Sorting.NEWER;
    this.setState({ sortBy: newOrder });
  };

  render() {
    const { posts, onDelete } = this.props;
    const { sortBy } = this.state;

    const sortedPosts = posts.slice().sort((a, b) => {
      return sortBy === Sorting.NEWER ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
    });

    return (
      <div>
        <div>
          <button className="btn btn-primary" onClick={this.handleSorting}>
            {this.state.sortBy === Sorting.NEWER ? '▼ Novos' : '▼ Antigos'}
          </button>
        </div>
        <hr />
        {sortedPosts.map((post) => (
          <div key={post.id}>
            <p className="categoria">{post.categoria}</p>
            <p className="dataPostagem">Em: {new Date(post.timestamp).toLocaleString('pt-BR')}</p>
            <h3>{post.titulo}</h3>
            <h5>{post.corpo}</h5>
            <h6>Autor: {post.autor}</h6>
            <h6>Nota: {post.nota}</h6>
            <button className="btn btn-danger" onClick={() => onDelete(post.id)}>EXCLUIR</button>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

export default PostList;
