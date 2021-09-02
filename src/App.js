import { Component as comp, Fragment as frag } from 'react';
import "./assets/index.css";

class App extends comp {
  state = {
    posts: [
      { id: 1, titulo: 'Título do Post 1', resumo: 'Resumo do Post 1' },
      { id: 2, titulo: 'Título do Post 2', resumo: 'Resumo do Post 2' },
      { id: 3, titulo: 'Título do Post 3', resumo: 'Resumo do Post 3' },
      { id: 4, titulo: 'Título do Post 4', resumo: 'Resumo do Post 4' },
      { id: 5, titulo: 'Título do Post 5', resumo: 'Resumo do Post 5' },
    ],
  };
  
  deletePost = (postId) => {
    this.setState({
      posts: this.state.posts.filter((post) => post.id !== postId),
    });
  };

  // deletePost = (postId) => {
  //   return () => {
  //     this.setState({
  //       posts: this.state.posts.filter((post) => post.id !== postId),
  //     });
  //   };
  // }

  render() {
    return (
      <frag>
        <>
          {this.state.posts.map((post) => (
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
