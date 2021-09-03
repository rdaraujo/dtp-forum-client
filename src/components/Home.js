import { Component } from 'react';
import { deletePost, getPosts } from '../api/posts';
import PostList from './PostList';

class Home extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    getPosts().then((res) => this.setState({ posts: res.posts }));
  }

  handleDelete = (postId) => {
    deletePost(postId).then(() => {
      this.setState({
        posts: this.state.posts.filter((post) => post.id !== postId),
      });
    });
  };

  render() {
    return <PostList posts={this.state.posts} onDelete={this.handleDelete} />;
  }
}

export default Home;
