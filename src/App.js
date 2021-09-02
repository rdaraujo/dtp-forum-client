import { Component, Fragment } from 'react';
import { getPosts } from './api/posts';
import Post from './components/Post';
import "./assets/index.css";

const Sorting = {
  OLDER: 'OLDER',
  NEWER: 'NEWER'
}

class App extends Component {
  state = {
    posts: [],
    sortBy: Sorting.NEWER
  };
  
  componentDidMount () {
    getPosts().then( (res) => this.setState( { posts: res.posts } ) );
  }
  
  deletePost = (postId) => {
    this.setState({
      posts: this.state.posts.filter((post) => post.id !== postId),
    });
  };
  
  sortPosts = (a, b) => {
    if (this.state.sortBy === Sorting.NEWER) {
      return a.timestamp - b.timestamp;
    }
    return b.timestamp - a.timestamp;
  }

  switchSorting = () => {
    const { sortBy } = this.state;
    if ( sortBy === Sorting.NEWER ) {
      this.setState( { sortBy: Sorting.OLDER } );
    } else {
      this.setState( { sortBy: Sorting.NEWER } );
    }
  }

  render() {

    const { posts } = this.state;

    const sortedPosts = posts ? posts.slice().sort(this.sortPosts) : [];

    return (
      <Fragment>
        <div>
          <button className="btn btn-primary" onClick={ this.switchSorting }>
            {this.state.sortBy === Sorting.NEWER ? '▼ Novos' : '▼ Antigos' }
          </button>
        </div>
        <hr />
        {sortedPosts.map((post) =>
          <Post key={post.id} post={post} onDelete={this.deletePost} />
        )}
      </Fragment>
    );
  }
}

export default App;
