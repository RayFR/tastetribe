import styles from "../styles/LoginPage.module.css";
import logo from "../assets/TasteTribeLogo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch("http://localhost:3000/api/users/login", {
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
            <section className={styles.main}>
                <div className={styles.logoname}>
                    <img src={logo} alt="LOGO" className={styles.logo} />
                    <p className={styles.name}>TasteTribe</p>
                </div>

                <div className={styles.formsection}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <h1 className={styles.title}>Log In</h1>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Log In</button>
                    </form>
                </div>
            </section>

            <section className={styles.side}></section>
        </>
    );
}

export default LoginPage;