import React from 'react';

const posts = [
  {
    titulo: 'Título do Post 1',
    resumo: 'Resumo do Post 1',
  },
  {
    titulo: 'Título do Post 2',
    resumo: 'Resumo do Post 2',
  },
  {
    titulo: 'Título do Post 3',
    resumo: 'Resumo do Post 3',
  },
  {
    titulo: 'Título do Post 4',
    resumo: 'Resumo do Post 4',
  },
  {
    titulo: 'Título do Post 5',
    resumo: 'Resumo do Post 5',
  },
];

const App = () => {
  return (
    <React.Fragment>
      <>
        {posts.map((post) => (
          <div>
            <h5>{post.titulo}</h5>
            <p>{post.resumo}</p>
            <hr />
          </div>
        ))}
      </>
    </React.Fragment>
  );
};

export default App;
