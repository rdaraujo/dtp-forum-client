import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reaction, Sorting } from './constants';

const PostList = ( { posts, onDelete, onLike, onEdit } ) => {
  const [sortBy, setSortBy] = useState(Sorting.BY_LIKES)

  const sort = () => {
    const newOrder = sortBy === Sorting.BY_LIKES ? Sorting.BY_DISLIKES : Sorting.BY_LIKES;
    setSortBy(newOrder);
  };

  const sortedPosts = posts.slice().sort((a, b) => {
    return sortBy === Sorting.BY_LIKES ? b.nota - a.nota : a.nota - b.nota;
  });

  return (
    <div>
      <div>
        <button className="btn btn-primary" onClick={sort}>
          {sortBy === Sorting.BY_LIKES
            ? <div><span className="fas fa-sort" /> Menos Curtidos</div>
            : <div><span className="fas fa-sort" /> Mais Curtidos</div>
          }
        </button>
        <Link to="/novo-post" className="btn btn-danger">
          <span className="fas fa-plus-circle"></span> Novo Post
        </Link>
      </div>
      {sortedPosts.map((post) => (
        <div key={post.id} className="post">
          <p className="categoria">{post.categoria}</p>
          <p className="dataPostagem"><span className="fas fa-clock" /> {new Date(post.timestamp).toLocaleString('pt-BR')}</p>
          <h3><span className="fas fa-comment-dots" /> {post.titulo}</h3>
          <h5>{post.corpo}</h5>
          <h6><span className="fas fa-at" /> {post.autor}</h6>
          <h6><span className="fas fa-theater-masks" /> Nota: {post.nota}</h6>
          <button className="btn btn-good" onClick={() => onLike(post.id, Reaction.LIKE)}><span className="fas fa-thumbs-up" /></button>
          <button className="btn btn-danger" onClick={() => onLike(post.id, Reaction.DISLIKE)}><span className="fas fa-thumbs-down" /></button>
          <button className="btn btn-primary" onClick={() => onEdit(post.id)}><span className="fas fa-edit" /> Editar</button>
          <button className="btn btn-danger" onClick={() => onDelete(post.id)}><span className="fas fa-trash-alt" /> Apagar</button>
        </div>
      ))}
    </div>
  )
}

export default PostList;
