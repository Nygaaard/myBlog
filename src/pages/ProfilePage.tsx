import { useAuth } from "../context/AuthContext";
import Form from "../components/Form";
import { getData, deleteData, updateData } from "../components/api";
import { useEffect, useState } from "react";
import { PostSchema } from "../types/PostInterface";
import Post from "../components/Post";

const ProfilePage = () => {
  const [posts, setPosts] = useState<PostSchema[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editPost, setEditPost] = useState<PostSchema | null>(null);

  useEffect(() => {
    getData(setLoading, setPosts, setError);
  }, []);

  const { user } = useAuth();

  const handleEdit = (post: PostSchema) => {
    setEditPost(post);
  };

  const handleDelete = async (id: string) => {
    await deleteData(id);
    getData(setLoading, setPosts, setError);
  };

  const handleUpdate = async (post: PostSchema) => {
    await updateData(post);
    getData(setLoading, setPosts, setError);
    setEditPost(null);
  };

  return (
    <div>
      {loading && <p className="loading">Laddar...</p>}
      {error && <p className="error-message">{error}</p>}
      <h2>Min sida</h2>
      <h3>Hej och välkommen {user?.firstname || "Användare"}</h3>
      <Form editPost={editPost} onUpdate={handleUpdate} />
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post} />
          <button onClick={() => handleEdit(post)}>Hantera</button>
          <button onClick={() => handleDelete(post.id.toString())}>
            Radera
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;
