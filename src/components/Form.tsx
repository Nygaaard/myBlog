import { FormData } from "../types/FormInterface";
import { ErrorData } from "../types/PostInterface";
import { useState } from "react";
import * as yup from "yup";

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });

  //State för valideringsfel
  const [errors, setErrors] = useState<ErrorData>({});

  //Valideringsschema med Yup
  const validationSchema = yup.object({
    title: yup.string().required("Fyll i titel"),
    content: yup
      .string()
      .required("Fyll i beskrivning")
      .max(200, "Beskrivningen kan vara max 200 tecken lång"),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, {
        abortEarly: false,
      });

      setErrors({});

      const token = localStorage.getItem("token");

      //Skicka inlägg till backend
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Något gick fel vid skapandet av inlägg");
      }

      const data = await response.json();
      console.log(data);

      //Uppdatera state
      setFormData({
        title: "",
        content: "",
      });
    } catch (errors) {
      const validationErrors: ErrorData = {};

      if (errors instanceof yup.ValidationError) {
        errors.inner.forEach((error) => {
          const prop = error.path as keyof ErrorData;

          validationErrors[prop] = error.message;
        });

        setErrors(validationErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Titel:</label>
      <input
        type="text"
        name="title"
        id="title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      {errors.title && <span className="error-message">{errors.title}</span>}

      <label htmlFor="content">Inlägg:</label>
      <input
        type="text"
        name="content"
        id="content"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
      />
      {errors.content && (
        <span className="error-message">{errors.content}</span>
      )}

      <input type="submit" value="Lägg till inlägg" />
    </form>
  );
};

export default Form;
