import React from "react";

const List = ({ todoList, onDelete }) => {
  return (
    <div className="todo-list" id="todoList">
      {/* List of todos will be rendered here */}
      {todoList.map((todo) => (
        <div className="todo-item" key={todo.id}>
          <div
            className={`status-bar ${todo.status.toLowerCase().replace(" ", "-")}`}
          ></div>
          
          <div className="todo-content">
            <div className="todo-title text-left">{todo.title}</div>
            <div className="todo-deadline text-left">Deadline: {todo.deadline}</div>
          </div>

          <div className="todo-actions">
            <div className="todo-edit">Edit</div>
            <div className="todo-delete" onClick={() => onDelete(todo.id)}>
              X
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
