import { useEffect } from "react";
import Modal from "./components/Modal";
import List from "./components/List";
import Legend from "./components/Legend";

function App() {
  const API_URL = "http://localhost:3001/todos";

  // Get all todos
  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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

  return (
    <>
      <div className="make-center">
        <h1>Todo List</h1>
        <button className="add-btn" id="openModal">
          Add a new todo
        </button>

        <Modal />

        <div className="flex-center">
          <List />
          <Legend />
        </div>
      </div>
    </>
  );
}

export default App;
