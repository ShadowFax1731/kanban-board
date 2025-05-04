import { useState, useEffect } from "react";
import TaskInputForm from "./components/TaskInputForm";
import TaskGrid from "./components/TaskGrid";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
    setShowForm(false); // Hide form after adding
  };

  const handleStatusChange = (taskId, newStatus) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedTask = { ...task, status: newStatus };

    fetch(`https://kanban-api-s65u.onrender.com/api/v1/tasks/${taskId}`, {
      method: "PATCH",
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
    <div className="container mt-4">
      <h1 className="text-center mb-4">Kanban Task Manager</h1>

      {!showForm && (
        <div className="text-center mb-3">
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Add New Task
          </button>
        </div>
      )}

      {showForm && (
        <div className="form-container mb-4">
          <TaskInputForm onTaskAdded={handleTaskAdded} />
        </div>
      )}

      <TaskGrid tasks={tasks} onStatusChange={handleStatusChange} />
    </div>
  );
}

export default App;
