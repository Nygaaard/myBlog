import { useState, useEffect } from "react";
import { PostSchema } from "../types/PostInterface";
import { getData } from "../components/api";
import { NavLink } from "react-router-dom";

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

      {posts.length > 0 ? (
        <div className="posts">
          {posts.map((post) => (
            <div key={post.id} className="post">
              {/* Här gör vi endast rubriken klickbar */}
              <NavLink to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
              </NavLink>
              <p>{post.content}</p>
              <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Inga inlägg hittades...</p>
      )}
    </div>
  );
};

export default HomePage;
