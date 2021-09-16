import { useParams } from 'react-router-dom';
import PostList from './PostList';
import { usePosts } from './usePosts';

const Categoria = () => {
  const params = useParams();
  const { posts, excludePost, reactPost, editPost } = usePosts(params.categoria);

  return (
    <div>
      <PostList posts={posts} onDelete={excludePost} onLike={reactPost} onEdit={editPost} />
    </div>
  );
}

export default Categoria;
