import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { deletePost, getPosts, reactToPost } from '../api/posts';
import { Reaction } from './constants';
import PostList from './PostList';

class Categoria extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    const { categoria } = this.props.match.params;
    this.consultPosts(categoria);
  }

  componentDidUpdate(prevProps) {
    const { categoria } = this.props.match.params;
    if (prevProps.match.params.categoria !== categoria) {
      this.consultPosts(categoria);
    }
  }
  
  consultPosts(categoria) {
    getPosts(categoria).then((res) => {
      this.setState({
        posts: res.posts.filter((post) => post.categoria === categoria),
      });
    });
  }

  handleDelete = (postId) => {
    deletePost(postId)
      .then( () => this.setState( { posts: this.state.posts.filter( post => post.id !== postId) } ) )
      .catch( (err) => alert(err) );
  };

  handleReaction = (postId, reaction) => {
    const formData = { opcao: reaction };

    const post = this.state.posts.find( post => post.id === postId);

    if (post) {
      const currentLikes = post.nota;
      const newLikes = reaction === Reaction.LIKE ? currentLikes + 1 : currentLikes - 1;
  
      this.setState({
        posts: this.state.posts.map( post => post.id === postId ? { ...post, nota: newLikes } : post )
      });
  
      reactToPost(postId, formData).catch( () => 
        this.setState({
          posts: this.state.posts.map( post => post.id === postId ? { ...post, nota: currentLikes } : post )
        })
      );
    }

  };

  render() {
    const { match } = this.props;
    const { posts } = this.state;

    return (
      <div>
        <h3>{match.params.categoria}: {posts.length}</h3>
        <PostList posts={posts} onDelete={this.handleDelete} onLike={this.handleReaction} />
      </div>
    );
  }
}

export default withRouter(Categoria);
