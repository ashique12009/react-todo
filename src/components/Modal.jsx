import React, { useState } from "react";

const Modal = ({ open, setOpen, onAdd }) => {

  if (!open) return null; // Don't render the modal if open is false

  const API_URL = "http://localhost:3001/todos";

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("not-started");

  const handleAdd = () => {
    const newTodo = {
      title,
      deadline,
      status,
    };

    onAdd(newTodo); // 🔥 Telling App to add new todo
    setTitle("");
    setDeadline("");
    setStatus("not-started");
    setOpen(false);
  };

  return (
    <div className="modal-overlay" id="modalOverlay">
      <div className="modal">
        <h2>Add new todo</h2>
        <input
          type="text"
          id="todoTitle"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          id="todoDeadline"
          placeholder="Deadline"
          value={deadline}
          onChange={(e) => {
            setDeadline(e.target.value);
          }}
        />
        <select
          id="todoStatus"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value="" disabled>
            Status
          </option>
          <option value="not-started">Not started</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
        <div className="modal-actions">
          <button
            className="btn-cancel"
            id="cancelBtn"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button className="btn-add" id="addBtn" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
