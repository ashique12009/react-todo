import React, { useEffect, useState } from "react";

const Modal = ({ open, setOpen, onAdd, selectedTodo, onUpdate }) => {
  if (!open) return null; // Don't render the modal if open is false

  const API_URL = "http://localhost:3001/todos";

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("not-started");

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDeadline(selectedTodo.deadline);
      setStatus(selectedTodo.status);
    } else {
      setTitle("");
      setDeadline("");
      setStatus("not-started");
    }
  }, [selectedTodo]);

  const handleAdd = () => {
    const todoData = {
      title,
      deadline,
      status,
    };

    if (selectedTodo) {
      onUpdate({ ...todoData, id: selectedTodo.id });
    } else {
      onAdd(todoData);
    }

    setOpen(false);
  };

  return (
    <div className="modal-overlay" id="modalOverlay">
      <div className="modal">
        <h2>{selectedTodo ? "Edit Todo" : "Add New Todo"}</h2>
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
            {selectedTodo ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
