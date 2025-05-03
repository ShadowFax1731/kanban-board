import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const TaskInputForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/tasks", {
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
          // Clear form
          setTitle("");
          setDescription("");
          setStatus("");
          onTaskAdded(); // Notify App to refresh task list
        } else {
          console.log("Failed to add task");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Form className="mt-5 w-90% mx-auto" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the task name"
        />
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
        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select an option</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Task
      </Button>
    </Form>
  );
};

export default TaskInputForm;
