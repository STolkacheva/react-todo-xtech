import React, { useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import InputForm from "./InputForm";

export default function TaskItem({ taskId, changeItems }) {
  const tasks = useSelector((state) => state.tasks.items);
  const task = tasks.find((i) => i.id === taskId);
  const taskItems = task.items;
  console.log(taskItems);

  const [editItem, setEditItem] = useState("");

  const changeCheckbox = (index) => {
    const newItem = { ...taskItems[index], check: !taskItems[index].check };
    const items = taskItems.map((i, idx) => {
      if (idx === index) return newItem;
      else return i;
    });
    changeItems(items);
  };

  const resetEditMode = () => {
    setEditItem("");
  };

  const submit = (text, index) => {
    if (text === "") return;
    const newItem = { ...taskItems[index], title: text };
    const items = taskItems.map((i, idx) => {
      if (idx === index) return newItem;
      else return i;
    });    
    changeItems(items);
  };

  const deleteTaskItem = (index) => {
    const items = taskItems.filter((i, idx) => index !== idx);
    changeItems(items);
  };

  return (
    <ListGroup variant="flush">
      {taskItems.map((item, index) => (
        <ListGroup.Item
          key={index}
          className="d-flex justify-content-between align-items-center"
        >
          {editItem === item ? (
            <InputForm
              title={item.title}
              onSubmit={(text) => submit(text, index)}
              onCancel={resetEditMode}
            />
          ) : (
            <>
              <Form>
                <Form.Check
                  type="checkbox"
                  id={item.title}
                  label={item.title}
                  checked={item.check}
                  onChange={() => changeCheckbox(index)}
                />
              </Form>
              <div>
                <Button
                  variant="outline-warning"
                  onClick={() => setEditItem(item)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16" >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => deleteTaskItem(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16" >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </Button>
              </div>
            </>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
