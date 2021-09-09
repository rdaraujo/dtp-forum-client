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
          <Link to="/novo-post" className="btn btn-danger">
            <span className="fas fa-plus-circle"></span> Novo Post
          </Link>
          <button className="btn btn-primary" onClick={this.handleSorting}>
            {this.state.sortBy === Sorting.BY_LIKES
              ? <div><span className="fas fa-sort" /> Mais Curtidos</div>
              : <div><span className="fas fa-sort" /> Menos Curtidos</div>
            }
          </button>
        </div>
        <hr />
        {sortedPosts.map((post) => (
          <div key={post.id}>
            <p className="categoria">{post.categoria}</p>
            <p className="dataPostagem"><span className="fas fa-clock" /> Em: {new Date(post.timestamp).toLocaleString('pt-BR')}</p>
            <h3><span className="fas fa-comment-dots" /> {post.titulo}</h3>
            <h5>{post.corpo}</h5>
            <h6><span className="fas fa-at" /> {post.autor}</h6>
            <h6><span className="fas fa-chevron-right" /> Nota: {post.nota}</h6>
            <button className="btn btn-danger" onClick={() => onLike(post.id, Reaction.LIKE)}>
              <span className="fas fa-thumbs-up" />
            </button>
            <button className="btn btn-danger" onClick={() => onLike(post.id, Reaction.DISLIKE)}>
              <span className="fas fa-thumbs-down" />
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(post.id)}>
              <span className="fas fa-trash-alt" /> Apagar
            </button>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

export default PostList;
