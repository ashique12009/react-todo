import { useState } from "react";
import Modal from "./components/Modal";
import List from "./components/List";
import Legend from "./components/Legend";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button className="add-btn" id="openModal">Add a new todo</button>

      <Modal />

      <List />

      <Legend />
    </>
  );
}

export default App;
