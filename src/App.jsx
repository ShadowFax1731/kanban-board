import { useState, useEffect } from "react";
import TaskInputForm from "./components/TaskInputForm";
import TaskGrid from "./components/TaskGrid";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Spinner, Toast, ToastContainer } from "react-bootstrap";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusChangingTaskId, setStatusChangingTaskId] = useState(null);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const showGlobalToast = (message, variant = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const fetchTasks = () => {
    setLoading(true);
    fetch("https://kanban-api-s65u.onrender.com/api/v1/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((e) => showGlobalToast("Failed to load tasks", "danger"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = () => {
    setShowForm(false);
    fetchTasks();
    showGlobalToast("Task added successfully!", "success");
  };

  const handleStatusChange = (taskId, newStatus) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    const updatedTask = { ...task, status: newStatus };
    setStatusChangingTaskId(taskId);

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
          showGlobalToast("Task status updated!", "success");
        } else {
          showGlobalToast("Failed to update status", "danger");
        }
      })
      .catch(() => showGlobalToast("Something went wrong!", "danger"))
      .finally(() => setStatusChangingTaskId(null));
  };

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Kanban Board</h1>
        <div className="d-flex justify-content-center mb-3">
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close Form" : "Add New Task"}
          </Button>
        </div>

        {showForm && <TaskInputForm onTaskAdded={handleTaskAdded} />}

        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <TaskGrid
            tasks={tasks}
            onStatusChange={handleStatusChange}
            statusChangingTaskId={statusChangingTaskId}
          />
        )}

        {/* Global Toast Notification */}
        <ToastContainer position="bottom-end" className="p-3">
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            bg={toastVariant}
          >
            <Toast.Body className="text-white">{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
}

export default App;
