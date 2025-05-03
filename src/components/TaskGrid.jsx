import { Container, Row, Col } from "react-bootstrap";

const TaskGrid = ({ tasks }) => {
  return (
    <Container className="mt-5">
      <Row>
        <Col className="text-center">
          TO-DO
          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <Row key={task.id}>
                <p>{task.title}</p>
                <p>{task.description}</p>
              </Row>
            ))}
        </Col>
        <Col className="text-center">
          IN PROGRESS
          {tasks
            .filter((task) => task.status === "in-progress")
            .map((task) => (
              <Row key={task.id}>
                <p>{task.title}</p>
                <p>{task.description}</p>
              </Row>
            ))}
        </Col>
        <Col className="text-center">
          DONE
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <Row key={task.id}>
                <p>{task.title}</p>
                <p>{task.description}</p>
              </Row>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default TaskGrid;
