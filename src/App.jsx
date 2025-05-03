import { useState, useEffect } from "react";
import TaskInputForm from "./components/TaskInputForm";
import TaskGrid from "./components/TaskGrid";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    fetch("https://kanban-api-s65u.onrender.com/api/v1/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = () => {
    fetchTasks();
  };

  const handleStatusChange = (taskId, newStatus) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedTask = { ...task, status: newStatus };

    fetch(`https://kanban-api-s65u.onrender.com/api/v1/tasks/${taskId}`, {
      method: "PUT", // or PATCH depending on your backend
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => {
        if (res.ok) {
          setTasks((prev) =>
            prev.map((t) => (t.id === taskId ? updatedTask : t)),
          );
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="form-container">
        <TaskInputForm onTaskAdded={handleTaskAdded} />
      </div>
      <TaskGrid tasks={tasks} onStatusChange={handleStatusChange} />
    </>
  );
}

export default App;
