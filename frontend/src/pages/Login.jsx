import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://smart-task-app-acsx.onrender.com/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.reload();
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Welcome Back</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={styles.input} />

        <button onClick={handleLogin} style={styles.button}>Login</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #141e30, #243b55)",
  },
  box: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#2a5298",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};