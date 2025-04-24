import styles from "../styles/FeedPage.module.css";
import Shell from "../components/Shell.jsx";
import Recipe from "../components/Recipe.jsx";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants.js";
import magnifier from "../assets/magnifier.png";

function FeedPage() {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/recipes/allrecipes`)
            .then(res => res.json())
            .then(data => {
                setRecipes(data);
                setFilteredRecipes(data);
            })
            .catch(err => console.error("Failed to fetch recipes", err));
    }, []);

    useEffect(() => {
        const results = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRecipes(results);
    }, [searchTerm, recipes]);

    return (
        <>
            <main>
                <Shell />
                <section className={styles.feed}>
                    <div className={styles.top}>
                        <h1 className={styles.title}>Feed</h1>
                        <div className={styles.search}>
                            <img src={magnifier} alt="MAGNIFIER" />
                            <input
                                type="text"
                                placeholder="Search recipes..."
                                className={styles.searchBar}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className={styles.recipes}>
                        {filteredRecipes.length > 0 ? (
                            filteredRecipes.map((recipe) => (
                                <Recipe key={recipe.rid} recipe={recipe} />
                            ))
                        ) : (
                            <p>No recipes found.</p>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}

export default FeedPage;
