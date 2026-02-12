import React from "react";

const List = () => {
  return (
    <div className="todo-list" id="todoList">
      {/* List of todos will be rendered here */}
      <div className="todo-item">
        <div className="status-bar not-started"></div>
        <div className="todo-content">
          <div className="todo-title text-left">Test title</div>
          <div className="todo-deadline">Deadline: test deadline</div>
        </div>
      </div>
    </div>
  );
};

export default List;
