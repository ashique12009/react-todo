import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from './components/TodoList';

function App() {
    return (
        <>
            <div className="container form-container">
                <div className="row">
                    <div className="column">
                        <TodoForm />

                        <TodoList />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
