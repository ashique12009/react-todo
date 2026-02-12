import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import List from "./components/List";
import Legend from "./components/Legend";

function App() {
  const API_URL = "http://localhost:3001/todos";
  const [openModal, setOpenModal] = useState(false);

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
        <div className="flex-center">
          <button
            className="add-btn mt-20"
            id="openModal"
            onClick={() => setOpenModal(true)}
          >
            Add a new todo
          </button>
          <Legend />
        </div>

        <Modal open={openModal} setOpen={setOpenModal} />

        <div className="mx-width-460px mt-20 m0auto">
          <List />
        </div>
      </div>
    </>
  );
}

export default App;
