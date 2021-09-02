import { Component as comp, Fragment as frag } from 'react';
import "./assets/index.css";

const SORT_BY = {
  ASC: 'ASC',
  DESC: 'DESC'
}

class App extends comp {
  state = {
    posts: [
      { id: 1, titulo: 'Título do Post 1', resumo: 'Resumo do Post 1' },
      { id: 2, titulo: 'Título do Post 2', resumo: 'Resumo do Post 2' },
      { id: 3, titulo: 'Título do Post 3', resumo: 'Resumo do Post 3' },
      { id: 4, titulo: 'Título do Post 4', resumo: 'Resumo do Post 4' },
      { id: 5, titulo: 'Título do Post 5', resumo: 'Resumo do Post 5' },
    ],
    sortBy: SORT_BY.ASC
  };
  
  deletePost = (postId) => {
    this.setState({
      posts: this.state.posts.filter((post) => post.id !== postId),
    });
  };

  sortPosts = (a, b) => {
    if (this.state.sortBy === SORT_BY.ASC) {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  }

  changeSort = (sortBy) => {
    this.setState( { sortBy } );
  }

  // deletePost = (postId) => {
  //   return () => {
  //     this.setState({
  //       posts: this.state.posts.filter((post) => post.id !== postId),
  //     });
  //   };
  // }

  render() {

    const sortedPosts = this.state.posts.slice().sort(this.sortPosts);

    return (
      <frag>
        <>
          <div>
            <button className="btn btn-primary" onClick={() => this.changeSort(SORT_BY.ASC)}>Antigos</button>
            <button className="btn btn-primary" onClick={() => this.changeSort(SORT_BY.DESC)}>Novos</button>
          </div>
          {sortedPosts.map((post) => (
            <div key={post.id}>
              <h3>{post.titulo}</h3>
              <h6>{post.resumo}</h6>
              <button className="btn btn-danger"
                onClick={() => this.deletePost(post.id)}>
                EXCLUIR
              </button>
              <hr />
            </div>
          ))}
        </>
      </frag>
    );
  }
}

export default App;
