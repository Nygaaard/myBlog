import { FormData } from "../types/FormInterface";
import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("tes test");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Titel:</label>
      <input
        type="text"
        name="titel"
        id="titel"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <label htmlFor="content">Inlägg:</label>
      <input
        type="text"
        name="content"
        id="content"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
      />

      <input type="submit" value="Lägg till inlägg" />
    </form>
  );
};

export default Form;
