import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { deletePost, getPosts, reactToPost } from '../api/posts';
import { Reaction } from './constants';
import PostList from './PostList';

class Home extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    getPosts().then((res) => this.setState({ posts: res.posts }));
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
  
      reactToPost(postId, formData).catch( () => {
        this.setState({
          posts: this.state.posts.map( post => post.id === postId ? { ...post, nota: currentLikes } : post )
        })
      });
    }

  };

  render() {
    return (
      <PostList posts={this.state.posts} onDelete={this.handleDelete} onLike={this.handleReaction} />
    );
  }
}

export default withRouter(Home);
