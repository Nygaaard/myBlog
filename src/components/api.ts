import { PostSchema } from "../types/PostInterface";

export const getData = async (
  setLoading: (loading: boolean) => void,
  setPosts: (posts: PostSchema[]) => void,
  setError: (error: string) => void
) => {
  try {
    setLoading(true);
    const response = await fetch("http://localhost:3000/posts");

    if (!response.ok) {
      throw Error("Något gick fel...");
    } else {
      const data = await response.json();

      // Set posts
      setPosts(data);
    }
  } catch {
    setError("Något gick fel vid hämtning...");
  } finally {
    // Avbryt laddning
    setLoading(false);
  }
};
