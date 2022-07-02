import React, { useRef, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeBoard, renameBoard, updateBoards } from "../store/boardsSlice";
import { addCard, removeCard, updateCards } from "../store/cardsSlice";
import { removeTask } from "../store/tasksSlice";
import CommonForm from "./CommonForm";
import ModalCard from "./ModalCard";

export default function Board() {
  const [modalShow, setModalShow] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [dragging, setDragging] = useState(false);
  const [draggingBoard, setDraggingBoard] = useState(false);

  const boards = useSelector((state) => state.boards.items);
  const cards = useSelector((state) => state.cards.items);
  const tasks = useSelector((state) => state.tasks.items);
  const dispatch = useDispatch();

  const dragItem = useRef();
  const dragNote = useRef();
  const dragBoard = useRef();
  const dragNoteBoard = useRef();

  const onDeleteBoard = (id) => {
    cards.filter((i) => i.boardId === id).map((card) => {
        tasks.map((task) => {
          if (task.cardId === card.id) {
            dispatch(removeTask(task.id));
          }
        });
        dispatch(removeCard(card.id));
      });
    dispatch(removeBoard(id));
  };

  const onAddCard = (title, boardId) => {
    if (title === "") return;
    dispatch(addCard({title, boardId}));
  };

  const renameBoardTitle = (title, id) => {
    dispatch(renameBoard({ id, title }));
  };

  const dragStartBoard = (e, params) => {
    if (dragItem.current) return;

    dragBoard.current = params;
    dragNoteBoard.current = e.target;
    dragNoteBoard.current.addEventListener("dragend", dragEndBoard);
    setTimeout(() => {
      setDraggingBoard(true);
    }, 0);
  };

  const dragEndBoard = () => {
    setDraggingBoard(false);
    dragNoteBoard.current.removeEventListener("dragend", dragEndBoard);
    dragBoard.current = null;
    dragNoteBoard.current = null;
  };

  const dragEnterBoard = (e, params) => {
    if (!draggingBoard) return;

    const currentItem = dragBoard.current;
    if (dragNoteBoard.current !== e.target) {
      let newList = JSON.parse(JSON.stringify(boards));
      newList.splice(currentItem.index, 1);
      newList.splice(params.index, 0, boards[currentItem.index]);
      dragBoard.current = params;
      dispatch(updateBoards(newList));
    }
  };

  const getStylesBoard = (params) => {
    const res = {};
    if (draggingBoard) {
      const curItem = dragBoard.current;
      if (curItem.index === params.index)
        return { ...res, opacity: 0.1 };
    }

    return res;
  };

  const dragStart = (e, params) => {
    dragItem.current = params;
    dragNote.current = e.target;
    dragNote.current.addEventListener("dragend", dragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const dragEnd = () => {
    setDragging(false);
    dragNote.current.removeEventListener("dragend", dragEnd);
    dragItem.current = null;
    dragNote.current = null;
  };

  const dragEnter = (e, params) => {
    const currentItem = dragItem.current;
    if (dragNote.current !== e.target) {
      let newList = JSON.parse(JSON.stringify(cards));
      if (params.index === -1) {
        newList[currentItem.index].boardId = params.boardId;
      } else {
        newList.splice(currentItem.index, 1);
        newList.splice(params.index, 0, {...cards[currentItem.index], boardId: params.boardId});
        dragItem.current = params;
      }
      dispatch(updateCards(newList));
    }
  };

  const getStyles = (params) => {
    const res = {};
    if (dragging) {
      const curItem = dragItem.current;
      if (curItem.boardId === params.boardId && curItem.index === params.index)
        return { ...res, opacity: 0.1 };  
    }

    return res;
  };

  const getDragEnter = (e, id) => {
    return dragging && !cards.filter((i) => i.boardId === id).length
      ? dragEnter(e, { boardId: id, index: -1 })
      : null;
  };

  return (
    <div
      className="boards d-flex flex-nowrap overflow-auto mt-2"
      style={{ height: "85vh" }}
    >
      {boards.map((board, index) => (
        <div
          className="board__item float-start me-2"
          key={board.id}
          draggable
          style={getStylesBoard({ index })}
          onDragStart={(e) => dragStartBoard(e, { index })}
          onDragEnter={ dragging ? (e) => getDragEnter(e, board.id) : (e) => dragEnterBoard(e, { index })}
        >
          <CommonForm
            title={board.title}
            onDelete={() => onDeleteBoard(board.id)}
            onAdd={(title) => onAddCard(title, board.id)}
            onChangeTitle={(title) => renameBoardTitle(title, board.id)}
          >
            <ListGroup variant="flush">
              {cards.filter((i) => i.boardId === board.id).map((card) => {
                let index = cards.findIndex((i) => i.id === card.id);
                  return (
                    <ListGroup.Item
                      draggable
                      style={ getStyles({ boardId: board.id, index })}
                      onDragStart={(e) => dragStart(e, { boardId: board.id, index })}
                      onDragEnter={ dragging ? (e) => dragEnter(e, { boardId: board.id, index }) : null }
                      key={card.id}
                      onClick={() => {
                        setModalShow(true);
                        setSelectedCard(card);
                      }}
                    >
                      {card.title}
                    </ListGroup.Item>
                  );
                })}
            </ListGroup>
            <ModalCard
              show={modalShow}
              onHide={() => setModalShow(false)}
              id={selectedCard ? selectedCard.id : null}
            />
          </CommonForm>
        </div>
      ))}
    </div>
  );
}
