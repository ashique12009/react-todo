import { useState } from "react";
import Modal from "./components/Modal";
import List from "./components/List";
import Legend from "./components/Legend";
import useTodos from "./hooks/useTodos";

function App() {
  const { todos, addTodo, deleteTodo, updateTodo } = useTodos();
  const [openModal, setOpenModal] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState(null);

  return (
    <>
      <div className="make-center">
        <h1>Todo List</h1>
        <div className="flex-center">
          <button
            className="add-btn mt-20"
            id="openModal"
            onClick={() => {
              setOpenModal(true);
              setSelectedTodo(null);
            }}
          >
            Add a new todo
          </button>
          <Legend />
        </div>

        <Modal
          open={openModal}
          setOpen={setOpenModal}
          onAdd={addTodo}
          onUpdate={updateTodo}
          selectedTodo={selectedTodo}
        />

        <div className="mx-width-460px mt-20 m0auto">
          <List
            todoList={todos}
            onDelete={deleteTodo}
            onEdit={(todo) => {
              setSelectedTodo(todo);
              setOpenModal(true);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
