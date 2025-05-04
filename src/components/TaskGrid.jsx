import { Container, Row, Col } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskGrid = ({ tasks, onStatusChange, statusChangingTaskId }) => {
  const statuses = ["todo", "in-progress", "done"];

  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "#f8d7da"; // Light red
      case "in-progress":
        return "#fff3cd"; // Light yellow
      case "done":
        return "#d4edda"; // Light green
      default:
        return "#ffffff";
    }
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;
    onStatusChange(draggableId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container fluid className="mt-4 px-3">
        <Row className="g-3 flex-wrap">
          {statuses.map((status) => (
            <Col
              key={status}
              xs={12}
              md={6}
              lg={4}
              className="d-flex flex-column align-items-center"
            >
              <h5 className="mb-3 text-uppercase">
                {status.replace("-", " ")}
              </h5>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      minHeight: "200px",
                      width: "100%",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "8px",
                      padding: "10px",
                      maxWidth: "420px",
                    }}
                  >
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: "none",
                                margin: "0 0 10px 0",
                                padding: "10px",
                                background: getStatusColor(task.status),
                                border: "1px solid #dee2e6",
                                borderRadius: "5px",
                                wordBreak: "break-word",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                opacity:
                                  statusChangingTaskId === task.id ? 0.6 : 1,
                                position: "relative",
                                ...provided.draggableProps.style,
                              }}
                            >
                              <p className="fw-bold mb-1">{task.title}</p>
                              <p className="mb-0 text-muted">
                                {task.description}
                              </p>

                              {statusChangingTaskId === task.id && (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 1,
                                  }}
                                >
                                  <div
                                    className="spinner-border text-primary"
                                    role="status"
                                    style={{
                                      width: "1.5rem",
                                      height: "1.5rem",
                                    }}
                                  >
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          ))}
        </Row>
      </Container>
    </DragDropContext>
  );
};

export default TaskGrid;
