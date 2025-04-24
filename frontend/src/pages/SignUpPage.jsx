import styles from "../styles/SignUpPage.module.css";
import "../assets/TasteTribeLogo.png";
import { use, useState } from "react";
import httpClient from "../utils/httpClient";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });
    
            const data = await res.json();
    
            if (res.ok) {
                alert("Account Created");
                navigate("/login");
                clearForm();
            } else {
                alert("Error: " + data.error || "Something went wrong.");
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const clearForm = () => {
        setUsername("");
        setEmail("");
        setPassword("");
    };

    return(
        <>
            <main className={styles.main}>
                <section className={styles.content}>

                    <div className={styles.formsection}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <h1 className={styles.title}>Sign Up</h1>
                            <p className={styles.error}>{error}</p>
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                </section>

                <section className={styles.side}>
                    <strong>Already Have An Account?</strong>
                    <p>Log In to your account and access recipes!</p>
                    <button onClick={() => navigate("/login")}>Log In</button>
                </section>
            </main>

        </>
    );
}

export default SignUpPage;