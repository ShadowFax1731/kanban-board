import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const TaskInputForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({ title: "", status: "" });

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!status) newErrors.status = "Please select a status.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    fetch("https://kanban-api-s65u.onrender.com/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        title,
        description,
        status,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setTitle("");
          setDescription("");
          setStatus("");
          setErrors({ title: "", status: "" });
          onTaskAdded();
        } else {
          alert("Failed to add task");
        }
      })
      .catch(() => {
        alert("Something went wrong!");
      });
  };

  return (
    <Form
      className="mt-5 mx-auto"
      onSubmit={handleSubmit}
      style={{ maxWidth: 600 }}
    >
      <Form.Group className="mb-3">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the task name"
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter the task description"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Status:</Form.Label>
        <Form.Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          isInvalid={!!errors.status}
        >
          <option value="">Select an option</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.status}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Task
      </Button>
    </Form>
  );
};

export default TaskInputForm;
