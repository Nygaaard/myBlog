import { PostSchema } from "../types/PostInterface";

export const getData = async (
  setLoading: (loading: boolean) => void,
  setPosts: (posts: PostSchema[]) => void,
  setError: (error: string | null) => void
) => {
  setLoading(true);
  try {
    const response = await fetch("http://localhost:3000/posts");
    const data = await response.json();
    setPosts(data);
  } catch {
    setError("Något gick fel...");
  } finally {
    setLoading(false);
  }
};

export const updateData = async (post: PostSchema) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: post.title,
        content: post.content,
      }),
    });

    if (!response.ok) throw new Error("Misslyckades att uppdatera inlägg");
  } catch (error) {
    console.error("Något gick fel vid uppdatering av inlägg:", error);
  }
};

export const deleteData = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Misslyckades att radera inlägg");
  } catch (error) {
    console.error("Något gick fel vid radering av inlägg:", error);
  }
};

