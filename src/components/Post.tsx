import { PostSchema } from "../types/PostInterface";

const Post = ({ post }: { post: PostSchema }) => {
  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>{new Date(post.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default Post;
