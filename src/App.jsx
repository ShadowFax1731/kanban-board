import { useState, useEffect } from "react";
import TaskInputForm from "./components/TaskInputForm";
import TaskGrid from "./components/TaskGrid";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    fetch("http://localhost:8000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // This gets passed to TaskInputForm
  const handleTaskAdded = () => {
    fetchTasks();
  };

  return (
    <>
      <div className="form-container">
        <TaskInputForm onTaskAdded={handleTaskAdded} />
      </div>
      <TaskGrid tasks={tasks} />
    </>
  );
}

export default App;
