import React from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeCard, renameCard, renameCardDesc } from "../store/cardsSlice";
import { addTask, removeTask } from "../store/tasksSlice";
import Modal from "react-bootstrap/Modal";
import CommonForm from "./CommonForm";
import Task from "./Task";

export default function ModalCard(props) {
  const cards = useSelector((state) => state.cards.items);
  const tasks = useSelector((state) => state.tasks.items);

  const card = cards.find((i) => i.id === props.id);
  const list = tasks.filter((i) => i.cardId === props.id);

  const dispatch = useDispatch();

  const onAddTask = (title) => {
    if (title === "") return;
    dispatch(addTask({cardId: card.id, title}));
  };

  const onDeleteCard = (id) => {
    list.map((task) => {
      dispatch(removeTask(task.id));
    });
    dispatch(removeCard(id));
    props.onHide();
  };

  const renameCardTitle = (title) => {
    dispatch(renameCard({ id: card.id, title: title }));
  };

  const renameCardSubTitle = (subtitle) => {
    dispatch(renameCardDesc({ id: card.id, desc: subtitle }));
  };

  if (!card) return null;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Card View</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CommonForm
          title={card.title}
          subtitle={card.description}
          onDelete={() => onDeleteCard(card.id)}
          onAdd={onAddTask}
          onChangeTitle={renameCardTitle}
          onChangeSubTitle={renameCardSubTitle}
        >
          <ListGroup variant="flush">
            {list.map((task) => (
              <ListGroup.Item key={task.id}>
                <Task id={task.id} cardId={card.id} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </CommonForm>
      </Modal.Body>
    </Modal>
  );
}
