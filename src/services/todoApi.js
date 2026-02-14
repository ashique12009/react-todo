const API_URL = "http://localhost:3001/todos";

// Get all todos
export const getTodos = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

// Add a new todo
export const addTodo = async (newTodo) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

// Update a todo
export const updateTodo = async (updatedTodo) => {
  try {
    await fetch(`${API_URL}/${updatedTodo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};