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

  changeSort = (sortBy) => {
    this.setState( { sortBy } );
  }

  render() {

    const { posts } = this.state;

    const sortedPosts = posts ? posts.slice().sort(this.sortPosts) : [];

    return (
      <Fragment>
        <div>
          <button className="btn btn-primary" onClick={ () => this.changeSort( Sorting.NEWER ) }>▲ Antigos</button>
          <button className="btn btn-primary" onClick={ () => this.changeSort( Sorting.OLDER ) }>▼ Novos</button>
        </div>
        {sortedPosts.map((post) => (
          <div>
            <Post key={post.id} post={post} />
            <button className="btn btn-danger" onClick={ () => this.deletePost(post.id) }>EXCLUIR</button>
            <hr />
          </div>
        ))}
      </Fragment>
    );
  }
}

export default App;
