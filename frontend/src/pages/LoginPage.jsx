import styles from "../styles/LoginPage.module.css";
import logo from "../assets/TasteTribeLogo.png";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../utils/constants";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await res.json();
    
            if (res.ok) {
                localStorage.setItem("token", data.token); 
                navigate("/feed");
            } else {
                alert("Error: " + (data.error || "Login failed"));
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return(
        <>
            <main className={styles.main}>
                <section className={styles.content}>

                    <div className={styles.formsection}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <h1 className={styles.title}>Log In</h1>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit">Log In</button>
                        </form>
                    </div>

                </section>

                <section className={styles.side}>
                    <strong>New Here?</strong>
                    <p>Sign Up and discover all new user curated recipes!</p>
                    <button onClick={() => navigate("/signup")}>Sign Up</button>
                </section>
            </main>

        </>
    );
}

export default LoginPage;