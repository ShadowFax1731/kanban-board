import { useState } from "react";
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";

const TaskInputForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState({ title: "", status: "" });

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

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

          setToastMessage("Task added successfully!");
          setToastVariant("success");
        } else {
          setToastMessage("Failed to add task.");
          setToastVariant("danger");
        }
        setShowToast(true);
      })
      .catch(() => {
        setToastMessage("Something went wrong!");
        setToastVariant("danger");
        setShowToast(true);
      });
  };

  return (
    <>
      <Form className="mt-5 mx-auto" onSubmit={handleSubmit}>
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

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
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
    </>
  );
};

export default TaskInputForm;
