import styles from "../styles/MyRecipesPage.module.css";
import Shell from "../components/Shell.jsx";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Recipe from "../components/Recipe.jsx";

function MyRecipesPage() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);

        fetch("http://localhost:3000/api/recipes/myrecipes", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        })
          .then(res => res.json())
          .then(data => setRecipes(data))
          .catch(err => console.error("Failed to fetch recipes:", err));
      } catch (err) {
        console.log("JWT token is invalid");
      }
    }
  }, []);

  if (!user) return (
    <div className="load-wrapp">
        <div className="load-9">
            <div className="spinner">
                <div className="bubble-1"></div>
                <div className="bubble-2"></div>
            </div>
        </div>
    </div>
  );

  return (
    <main>
      <Shell />
      <section className={styles.myrecipes}>
        <div className={styles.top}>
          <h1 className={styles.title}>My Recipes</h1>
        </div>
        <div className={styles.recipes}>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Recipe key={recipe.rid} recipe={recipe} isMyRecipe={true} /> 
            ))
          ) : (
            <div className="load-wrapp">
                <div className="load-9">
                    <div className="spinner">
                        <div className="bubble-1"></div>
                        <div className="bubble-2"></div>
                    </div>
                </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default MyRecipesPage;
