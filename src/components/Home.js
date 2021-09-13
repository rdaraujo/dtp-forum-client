import PostList from './PostList';
import { usePosts } from './usePosts';

const Home = () => {
  const { posts, excludePost, reactPost, editPost } = usePosts();

  return <PostList posts={posts} onDelete={excludePost} onLike={reactPost} onEdit={editPost} />
}

export default Home;
