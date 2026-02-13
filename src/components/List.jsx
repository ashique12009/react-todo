import React from "react";

const List = ({ todoList, onDelete }) => {
  console.log("Todo list in List component:", todoList);
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
            <div className="todo-deadline">Deadline: {todo.deadline}</div>
          </div>
          <div className="todo-delete" onClick={() => onDelete(todo.id)}>X</div>
        </div>
      ))}
    </div>
  );
};

export default List;
