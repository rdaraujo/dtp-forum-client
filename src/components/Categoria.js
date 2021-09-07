import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { deletePost, getPosts } from '../api/posts';
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
    deletePost(postId).then(() => {
      this.setState({
        posts: this.state.posts.filter((post) => post.id !== postId),
      });
    });
  };

  render() {
    const { match } = this.props;
    const { posts } = this.state;

    return (
      <div>
        <h3>{match.params.categoria}: {posts.length}</h3>
        <PostList posts={posts} onDelete={this.handleDelete} />
      </div>
    );
  }
}

export default withRouter(Categoria);
