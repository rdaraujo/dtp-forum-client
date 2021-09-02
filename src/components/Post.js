const Post = (props) => {
    const { post, onDelete } = props;
    const postDate  = new Date(post.timestamp).toLocaleString("pt-BR");

    return (
      <div>
        <p className="categoria">{post.categoria}</p>
        <p className="dataPostagem">Em: {postDate}</p>
        <h3>{post.titulo}</h3>
        <h5>{post.corpo}</h5>
        <h6>Autor: {post.autor}</h6>
        <h6>Nota: <p className="nota">{post.nota}</p></h6>
        <button className="btn btn-danger" onClick={ () => onDelete(post.id) }>EXCLUIR</button>
        <hr />
      </div>
    )
}

export default Post;