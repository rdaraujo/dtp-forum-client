import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Reaction, Sorting } from './constants';
class PostList extends Component {
  state = {
    sortBy: Sorting.BY_LIKES,
  };

  handleSorting = () => {
    const newOrder = this.state.sortBy === Sorting.BY_LIKES ? Sorting.BY_DISLIKES : Sorting.BY_LIKES;
    this.setState({ sortBy: newOrder });
  };

  render() {
    const { posts, onDelete, onLike } = this.props;
    const { sortBy } = this.state;

    const sortedPosts = posts.slice().sort((a, b) => {
      return sortBy === Sorting.BY_LIKES ? a.nota - b.nota : b.nota - a.nota;
    });

    return (
      <div>
        <div>
          <Link to="/novo-post" className="btn btn-danger text-link fas fa-plus-circle"/>
          <button className="btn btn-primary" onClick={this.handleSorting}>
            {this.state.sortBy === Sorting.BY_LIKES ? '▼ Mais Curtidos' : '▼ Menos Curtidos'}
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
            <button className="btn btn-danger fas fa-thumbs-up" onClick={() => onLike(post.id, Reaction.LIKE)} />
            <button className="btn btn-danger fas fa-thumbs-down" onClick={() => onLike(post.id, Reaction.DISLIKE)} />
            <button className="btn btn-danger fas fa-trash-alt" onClick={() => onDelete(post.id)} />
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

export default PostList;
