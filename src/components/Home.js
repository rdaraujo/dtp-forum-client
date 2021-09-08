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
      .then(() =>
        this.setState({
          posts: this.state.posts.filter((post) => post.id !== postId),
        })
      )
      .catch((err) => alert(err));
  };

  updatePostAfterReaction = (postId, nota) => {
    return (
      this.state.posts.map( post => {
        if (post.id === postId) {
          post.nota += nota;
        }
        return post;
      })
    )
  };

  handleReaction = (postId, reaction) => {
    const formData = { opcao: reaction };

    const nota = reaction === Reaction.LIKE ? 1 : -1;

    const posts = this.updatePostAfterReaction(postId, nota);
    this.setState({ posts });

    reactToPost(postId, formData).then((post) => {
      if (!post || !post.id) {
        const nota = reaction === Reaction.LIKE ? -1 : 1;
        const posts = this.updatePostAfterReaction(postId, nota);
        this.setState({ posts });
      }
    });
  };

  render() {
    return (
      <PostList posts={this.state.posts} onDelete={this.handleDelete} onLike={this.handleReaction} />
    );
  }
}

export default withRouter(Home);
