import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addItems, removeAllBoards } from "./store/boardsSlice";
import { removeAllCards } from "./store/cardsSlice";
import { removeAllTask } from "./store/tasksSlice";
import Board from "./components/Board";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const handleAddBoard = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    if (title === "") return;

    dispatch(addItems(title));
    e.target.title.value = "";
  };
  const clear = () => {
    dispatch(removeAllBoards());
    dispatch(removeAllCards());
    dispatch(removeAllTask());
  };

  return (
    <Container>
      <div className="d-grid my-2">
        <Button className="my-2" variant="outline-danger" onClick={clear}>
          Remove All
        </Button>
        <Form onSubmit={handleAddBoard}>
          <InputGroup>
            <Form.Control name="title" placeholder="Add new board..." />
            <Button variant="outline-secondary" type="reset">
              Clear
            </Button>
            <Button variant="outline-primary" type="submit">
              Add
            </Button>
          </InputGroup>
        </Form>
      </div>
      <Board />
    </Container>
  );
}

export default App;
