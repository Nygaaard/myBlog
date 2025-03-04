import { useState, useEffect } from "react";
import { PostSchema } from "../types/PostInterface";
import Post from "../components/Post";
import { getData } from "../components/api";

const HomePage = () => {
  const [posts, setPosts] = useState<PostSchema[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getData(setLoading, setPosts, setError);
  }, []);

  return (
    <div className="app-container">
      <h2>Alla inlägg</h2>
      {loading && <p className="loading">Laddar...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
