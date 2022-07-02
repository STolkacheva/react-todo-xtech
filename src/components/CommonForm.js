import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import InputForm from "./InputForm";

export default function CommonForm(props) {
  const { title, subtitle } = props;
  const [editMode, setEditMode] = useState("");
  const [addMode, setAddMode] = useState(false);

  const resetEditMode = () => {
    setEditMode("");
  };

  const submit = (text) => {
    editMode === "title" ? props.onChangeTitle(text) : props.onChangeSubTitle(text);
    resetEditMode();
  };

  const add = (text) => {
    props.onAdd(text)
    setAddMode(false);
  }

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        {editMode === "title" ? (
          <InputForm
            title={title}
            onSubmit={submit}
            onCancel={resetEditMode}
          />
        ) : (
          <>
            <span onClick={() => setEditMode("title")}>{title}</span>
            <Button variant="outline-danger" onClick={props.onDelete}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </Button>
          </>
        )}
      </Card.Header>
      { typeof subtitle !== "undefined" ? (
        editMode === "subtitle" ? (
          <InputForm
            title={subtitle}
            onSubmit={submit}
            onCancel={resetEditMode}
          />
        ) : (
          <Card.Body onClick={() => setEditMode("subtitle")}>
            <Card.Text>Description:</Card.Text>
            <Card.Title>{subtitle}</Card.Title>
          </Card.Body>
        )
      ) : null}
      {props.children}
      {addMode ? (
          <InputForm
            title=""
            onSubmit={add}
            onCancel={()=>setAddMode(false)}
          />
        ) : (
            <Button variant="outline-secondary" onClick={()=>setAddMode(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </Button>
        )}
    </Card>
  );
}
