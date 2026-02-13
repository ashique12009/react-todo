import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import List from "./components/List";
import Legend from "./components/Legend";

function App() {
  const API_URL = "http://localhost:3001/todos";
  const [openModal, setOpenModal] = useState(false);
  const [todos, setTodos] = useState([]);

  const [selectedTodo, setSelectedTodo] = useState(null);

  // Get all todos
  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async (newTodo) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      // Refresh the list after deleting a todo
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }

    // Refresh the list after deleting a todo
    fetchTodos();
  };

  // Update a todo
  const updateTodo = async (updatedTodo) => {
    try {
      await fetch(`${API_URL}/${updatedTodo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

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
