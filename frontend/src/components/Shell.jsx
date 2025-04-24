import styles from "../styles/ShellComp.module.css";
import logo from "../assets/TasteTribeLogo.png";
import picture from "../assets/profile.png";
import feed from "../assets/FeedIcon.png";
import myrecipes from "../assets/MyRecipesIcon.png";
import addrecipe from "../assets/AddRecipeIcon.png";  
import logout from "../assets/logout.png";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

function Shell() {
    const [user, setUser] = useState(null);
    const [postCount, setPostCount] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);

                fetch(`${API_URL}/recipes/myrecipes`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setPostCount(data.length);
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch recipes:", err);
                });

            } catch (err) {
                console.error("invalid jwt token", err);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <main className={styles.main}>
            <img className={styles.logo} src={logo} alt="LOGO" />
    
            {user ? (
                <>
                    <div className={styles.profile}>
                        <img src={picture} alt="PFP" className={styles.picture} />
                        <p className={styles.username}>{user.username}</p>
                        <p className={styles.email}>{user.email}</p>
                    </div>
    
                    <div className={styles.stats}>
                        <div className={styles.posts}>
                            <p className={styles.stat}>{postCount}</p>
                            <p>Posts</p>
                        </div>
                    </div>
    
                    <div className={styles.line}></div>
    
                    <div className={styles.options}>
                        <div className={styles.option}>
                            <img src={feed} alt="FEEDICON" className={styles.icon} />
                            <Link to="/feed"><p className={styles.text}>Feed</p></Link>
                        </div>
    
                        <div className={styles.option}>
                            <img src={myrecipes} alt="MYRECIPESICON" className={styles.icon} />
                            <Link to="/myrecipes"><p className={styles.text}>My Recipes</p></Link>
                        </div>
    
                        <div className={styles.option}>
                            <img src={addrecipe} alt="ADDRECIPEICON" className={styles.icon} />
                            <Link to="/addrecipe"><p className={styles.text}>Add Recipe</p></Link>
                        </div>
                    </div>
    
                    <button onClick={handleLogout} className={styles.logout}>
                        <img src={logout} alt="LOGOUTICON" />
                        <p>Logout</p>
                    </button>
                </>
            ) : (
                <>
                    <div className={styles.profile}>
                        <p className={styles.login}>You're logged out.</p>
                        <Link className="link" to="/login">Log In</Link>
                        <p className={styles.login}>Don't have an account?</p>
                        <Link className="link" to="/signup">Sign Up</Link>
                    </div>
    
                    <div className={styles.line}></div>
    
                    <div className={styles.options}>
                        <div className={styles.option}>
                            <img src={feed} alt="FEEDICON" className={styles.icon} />
                            <Link to="/feed"><p className={styles.text}>Feed</p></Link>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}

export default Shell;
