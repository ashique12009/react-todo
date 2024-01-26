import { useState } from "react";

const TodoForm = () => {
    const [title, setTitle] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title === "") {
            alert("Please enter a task");
            return;
        }
        console.log(title);
        setTitle("");
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div id="myDIV" className="header">
                    <h2>My To Do List</h2>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="myInput"
                            placeholder="Title..."
                        />
                        <input type="submit" className="addBtn" value="Add" />
                    </div>
                </div>
            </form>
        </>
    );
};

export default TodoForm;