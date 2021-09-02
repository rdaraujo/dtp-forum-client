const Post = (props) => {
    const { post } = props;
    const postDate  = new Date(post.timestamp).toLocaleString("pt-BR");

    return (
      <div>
        <h6>Categoria: {post.categoria}</h6>
        <h6>Em: {postDate}</h6>
        <h3>{post.titulo}</h3>
        <h5>{post.corpo}</h5>
        <h6>Autor: {post.autor}</h6>
        <h6>Nota: {post.nota}</h6>
      </div>
    )
}

export default Post;