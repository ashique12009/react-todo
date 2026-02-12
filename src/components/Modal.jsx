import React from "react";

const Modal = () => {
  return (
    <div className="modal-overlay" id="modalOverlay">
      <div className="modal">
        <h2>Add new todo</h2>
        <input type="text" id="todoTitle" placeholder="Title" />
        <input type="text" id="todoDeadline" placeholder="Deadline" />
        <select id="todoStatus">
          <option value="" disabled selected>Status</option>
          <option value="done">Done</option>
          <option value="not-started">Not started</option>
          <option value="in-progress">In progress</option>
        </select>
        <div class="modal-actions">
          <button class="btn-cancel" id="cancelBtn">Cancel</button>
          <button class="btn-add" id="addBtn">Add</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
