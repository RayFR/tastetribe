import styles from "../styles/RecipeComp.module.css";
import profile from "../assets/profile.png";
import food from "../assets/food.png";
import likeblack from "../assets/likeblack.png";
import saveblack from "../assets/saveblack.png";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/constants";

function Recipe({recipe, isMyRecipe=false}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (!recipe) return null;

    const [recipeData, setRecipeData] = useState(recipe);

    useEffect(() => {
    setRecipeData(recipe);
    }, [recipe]);

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/recipes/update/${recipe.rid}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(recipeData),
        });

        if (res.ok) {
            const updated = await res.json();
            setRecipeData(updated);
            closeModal();
            window.location.reload(); // or trigger a state refresh
        } else {
            console.error("Failed to update recipe");
        }
    };


    return(
        <>
                        <div className={styles.recipe}>
                            <div className={styles.profile}>
                                <img src={profile} alt="pfp" className={styles.pfp} />
                                <p className={styles.username}>{recipe.User ? recipe.User.username : "Unknown User"}</p>
                            </div>
                            <img src={`http://localhost:3000${recipe.image}`} alt="FOODIMAGE" className={styles.image} />                            
                            <div className={styles.content}>
                                <div className={styles.description}>
                                    <h1 className={styles.name}>{recipe.name}</h1>
                                    <p className={styles.block}>{recipe.description}</p>
                                </div>
                                <div className={styles.choices}>
                                    <div className={styles.likesave}>
                                        <img src={saveblack} alt="SAVE" className={styles.interaction} />
                                    </div>
                                <button className={styles.view} onClick={openModal}>
                                    {isMyRecipe ? "Edit" : "View"}
                                </button>
                                </div>
                            </div>
                        </div>

                        {isModalOpen && recipe && (
                        <div className={styles.modalBackdrop}>
                            <div className={styles.modal}>
                            <img src={`http://localhost:3000${recipe.image}`} alt="FOODIMAGE" className={styles.image} />
                            
                            {isMyRecipe ? (
                                <>
                                <input value={recipe.name} onChange={e => setRecipeData({...recipeData, name: e.target.value})} className={styles.input} />
                                <textarea value={recipe.description} onChange={e => setRecipeData({...recipeData, description: e.target.value})} className={styles.input} />
                                <input value={recipe.type} onChange={e => setRecipeData({...recipeData, type: e.target.value})} className={styles.input} />
                                <input value={recipe.cookingtime} onChange={e => setRecipeData({...recipeData, cookingtime: e.target.value})} className={styles.input} />
                                <textarea value={recipe.ingredients} onChange={e => setRecipeData({...recipeData, ingredients: e.target.value})} className={styles.input} />
                                <textarea value={recipe.instructions} onChange={e => setRecipeData({...recipeData, instructions: e.target.value})} className={styles.input} />
                                <button onClick={handleUpdate} className={styles.save}>Save</button>
                                </>
                            ) : (
                                <>
                                <h2>{recipe.name}</h2>
                                <p><strong>Type:</strong> {recipe.type}</p>
                                <p>{recipe.description}</p>
                                <p><strong>Cooking Time:</strong> {recipe.cookingtime} minutes</p>
                                <div>
                                    <h3>Ingredients</h3>
                                    <ul>{recipe.ingredients.split(",").map((ing, i) => <li key={i}>{ing.trim()}</li>)}</ul>
                                </div>
                                <div>
                                    <h3>Instructions</h3>
                                    <p>{recipe.instructions}</p>
                                </div>
                                </>
                            )}
                            
                            <button className={styles.close} onClick={closeModal}>Close</button>
                            </div>
                        </div>
                        )}

        </>
    )
}

export default Recipe;