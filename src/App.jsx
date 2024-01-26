import "./App.css";
import TodoForm from "./components/TodoForm";

function App() {
    return (
        <>
            <div className="container form-container">
                <div className="row">
                    <div className="column">
                        <TodoForm />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
