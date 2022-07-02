import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";

export default function InputForm({ title, onSubmit, onCancel }) {
  const [text, setText] = useState(title);
  
  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <Form onSubmit={submit}>
      <InputGroup>
        <Form.Control
          name="text"
          placeholder="input text..."
          value={text}
          onChange={onChange}
          autoFocus
        />
        <Button variant="outline-secondary" onClick={onCancel}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
        </Button>
        <Button variant="outline-success" type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
        </svg>
        </Button>
      </InputGroup>
    </Form>
  );
}
