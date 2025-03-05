import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostSchema } from "../types/PostInterface";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostSchema | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch {
        setError("Något gick fel...");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) return <p className="loading">Laddar...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="app-container">
      {post && (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        </>
      )}
    </div>
  );
};

export default PostPage;
