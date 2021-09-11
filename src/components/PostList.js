import { Component } from 'react';
import { Link } from 'react-router-dom';
import { deletePost, vote } from '../api/posts';
import { Reaction, Sorting } from './constants';
class PostList extends Component {
  state = {
    sortBy: Sorting.BY_LIKES,
  };

  handleSorting = () => {
    const newOrder = this.state.sortBy === Sorting.BY_LIKES ? Sorting.BY_DISLIKES : Sorting.BY_LIKES;
    this.setState({ sortBy: newOrder });
  };

  handleDelete = (postId) => {
    deletePost(postId)
      .then( () => this.props.setPosts( this.props.posts.filter( post => post.id !== postId ) ) )
      .catch( err => alert(err) )
  };

  handleReaction = (postId, reaction) => {
    const formData = { opcao: reaction };
    const nota = reaction === Reaction.LIKE ? 1 : -1;

    const posts = this.atualizaPost(postId, nota);
    this.props.setPosts(posts);
    
    vote(postId, formData).then((post) => {
      //post nao atualizado no backend
      if (!post || !post.id) {
        const posts = this.atualizaPost(postId, nota);
        this.props.setPosts(posts);
      }
    });
  };
  
  atualizaPost = (postId, nota) => {
    return (
      this.props.posts.map( post => {
        if (post.id === postId) {
          post.nota += nota;
        }
        return post;
      })
    )
  };

  render() {
    const { sortBy } = this.state;

    const sortedPosts = this.props.posts.slice().sort((a, b) => {
      return sortBy === Sorting.BY_LIKES ? a.nota - b.nota : b.nota - a.nota;
    });

    return (
      <div>
        <div>
          <Link to="/novo-post" className="btn btn-danger">
            <span className="fas fa-plus-circle"></span> Novo Post
          </Link>
          <button className="btn btn-primary" onClick={this.handleSorting}>
            {sortBy === Sorting.BY_LIKES
              ? <div><span className="fas fa-sort" /> Mais Curtidos</div>
              : <div><span className="fas fa-sort" /> Menos Curtidos</div>
            }
          </button>
        </div>
        <hr />
        {sortedPosts.map((post) => (
          <div key={post.id} className="post">
            <p className="categoria">{post.categoria}</p>
            <p className="dataPostagem"><span className="fas fa-clock" /> {new Date(post.timestamp).toLocaleString('pt-BR')}</p>
            <h3><span className="fas fa-comment-dots" /> {post.titulo}</h3>
            <h5>{post.corpo}</h5>
            <h6><span className="fas fa-at" /> {post.autor}</h6>
            <h6><span className="fas fa-theater-masks" /> Nota: {post.nota}</h6>
            <button className="btn btn-good" onClick={() => this.handleReaction(post.id, Reaction.LIKE)}><span className="fas fa-thumbs-up" /></button>
            <button className="btn btn-danger" onClick={() => this.handleReaction(post.id, Reaction.DISLIKE)}><span className="fas fa-thumbs-down" /></button>
            <button className="btn btn-danger" onClick={() => this.handleDelete(post.id)}><span className="fas fa-trash-alt" /> Apagar</button>
          </div>
        ))}
      </div>
    );
  }
}

export default PostList;
