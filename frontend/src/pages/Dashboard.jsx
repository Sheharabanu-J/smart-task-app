import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;

    await axios.post(
      "http://localhost:5000/api/tasks",
      { title, priority: "High" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${task.id}`,
      {
        status: task.status === "Pending" ? "Completed" : "Pending",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2>Task Manager</h2>
        <button onClick={logout} style={styles.logout}>Logout</button>
      </div>

      {/* Input */}
      <div style={styles.inputBox}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addBtn}>Add</button>
      </div>

      {/* Tasks */}
      <div style={styles.grid}>
        {tasks.map((t) => (
          <div key={t.id} style={styles.card}>
            <h3>{t.title}</h3>
            <p>Status: {t.status}</p>

            <button onClick={() => toggleStatus(t)} style={styles.toggle}>
              Toggle
            </button>

            <button onClick={() => deleteTask(t.id)} style={styles.delete}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #1e3c72, #2a5298)",
    padding: "20px",
    color: "white",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
  },
  inputBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
  },
  addBtn: {
    padding: "10px",
    background: "#00c6ff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },
  card: {
    background: "rgba(255,255,255,0.1)",
    padding: "15px",
    borderRadius: "10px",
  },
  toggle: {
    marginRight: "10px",
    padding: "5px",
    background: "green",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  delete: {
    padding: "5px",
    background: "red",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};