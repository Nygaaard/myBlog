import { useState, useEffect } from "react";
import { PostSchema } from "../types/PostInterface";
import Post from "../components/Post";

const HomePage = () => {
  const [posts, setPosts] = useState<PostSchema[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/posts");

      if (!response.ok) {
        throw Error("Något gick fel...");
      } else {
        const data = await response.json();

        //Set posts
        setPosts(data);
      }
    } catch {
      setError("Något gick fel vid hämtning... ");
    } finally {
      //Avbryt laddning
      setLoading(false);
    }
  };

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
