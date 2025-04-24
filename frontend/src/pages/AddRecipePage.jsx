import styles from "../styles/AddRecipePage.module.css";
import Shell from "../components/Shell.jsx";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import httpClient from "../utils/httpClient.jsx";
import { API_URL } from "../utils/constants.js";

const AddRecipe = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    cookingtime: "",
    ingredients: "",
    instructions: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await httpClient.post(`${API_URL}/recipes/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Recipe created successfully!");
      setForm({
        name: "",
        description: "",
        type: "",
        cookingtime: "",
        ingredients: "",
        instructions: "",
      });
      setImageFile(null);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setMessage("Failed to create recipe.");
    }
  };

  return (
    <main>
      <Shell />
      <section className={styles.addrecipe}>
        <div className={styles.top}>
          <h2 className={styles.title}>Add a Recipe</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Recipe name"
            required
          />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short description"
            required
          />
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Cuisine Type"
            required
          />
          <input
            name="cookingtime"
            value={form.cookingtime}
            onChange={handleChange}
            placeholder="Cooking time"
            required
          />
          <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            placeholder="Ingredients"
            required
          />
          <textarea
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            placeholder="Instructions"
            required
          />
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button type="submit">Create Recipe</button>
        </form>
        {message && <p>{message}</p>}
      </section>
    </main>
  );
};

export default AddRecipe;
