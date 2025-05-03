import { Container, Row, Col } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskGrid = ({ tasks, onStatusChange }) => {
  const statuses = ["todo", "in-progress", "done"];

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    onStatusChange(draggableId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container className="mt-5">
        <Row>
          {statuses.map((status) => (
            <Col key={status} className="text-center">
              <h5 className="mb-3">{status.toUpperCase()}</h5>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      minHeight: "200px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "8px",
                      padding: "10px",
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
                                background: "#fff",
                                border: "1px solid #dee2e6",
                                borderRadius: "5px",
                                ...provided.draggableProps.style,
                              }}
                            >
                              <p className="fw-bold mb-1">{task.title}</p>
                              <p className="mb-0 text-muted">
                                {task.description}
                              </p>
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
