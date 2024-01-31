import { useState, useEffect } from "react";
import TodoList from './TodoList';
import toast, { Toaster } from 'react-hot-toast';

const TodoForm = () => {
    const [title, setTitle] = useState("");
    const [itemId, setItemId] = useState(0);
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);
    const [addOrUpdate, setAddOrUpdate] = useState('add');

    const onTitleClick = (itemTitle, itemId) => {
        console.log('ITEM', itemTitle, itemId);
        setTitle(itemTitle);
        setItemId(itemId);
        setAddOrUpdate('update');
    }

    const fetchData = async (operation = '') => {
        let requestURL = 'http://localhost/classic-php-todo-rest-api/index.php';

        var myHeaders = new Headers();
        myHeaders.append("token", "secret_token");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        setLoader(true);
        try {
            let response = await fetch(requestURL, requestOptions);

            if (!response.ok) {
                toast.error(`HTTP error! Status: ${response.status}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let result = await response.json();

            setLoader(false);
            setList(result.todos);

            if (operation == 'delete') {
                toast.success('Todo item deleted successfully');
            } 
            else if (operation == 'add') {
                toast.success('Todo item added successfully');
            }

        } catch (error) {
            setLoader(false);
            toast.error('Error fetching data. Please try again.');
        }
    }

    useEffect(() => {
        console.log('TodoForm mounted');    
        fetchData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (title === "") {
            alert("Please enter task title first");
            return;
        }

        try {
            setLoader(true);
            if (addOrUpdate == 'update') {
                // Make PUT request
                const putURL = `http://localhost/classic-php-todo-rest-api/index.php`;
                const putHeaders = new Headers();
                putHeaders.append('token', 'secret_token');

                let payload = JSON.stringify({ 'title': title, 'id': itemId });

                const putOptions = {
                    method: 'PUT',
                    headers: putHeaders,
                    redirect: 'follow',
                    body: payload
                };

                const putResponse = await fetch(putURL, putOptions);

                if (!putResponse.ok) {
                    toast.error(`HTTP error! Status: ${putResponse.status}`);
                    throw new Error(`HTTP error! Status: ${putResponse.status}`);
                }
            }
            else {
                // Make POST request
                const postURL = `http://localhost/classic-php-todo-rest-api/index.php`;
                const postHeaders = new Headers();
                postHeaders.append('token', 'secret_token');

                let payload = JSON.stringify({ 'title': title });

                const postOptions = {
                    method: 'POST',
                    headers: postHeaders,
                    redirect: 'follow',
                    body: payload
                };

                const postResponse = await fetch(postURL, postOptions);

                if (!postResponse.ok) {
                    toast.error(`HTTP error! Status: ${postResponse.status}`);
                    throw new Error(`HTTP error! Status: ${postResponse.status}`);
                }
            }

            setLoader(false);
            fetchData('add');
        } catch (error) {
            setLoader(false);
            console.error('Addition error:', error.message);
            toast.error('Error addition todo item. Please try again.');
        }
        
        setTitle("");
    }

    return (
        <>
            <Toaster />
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

            {loader && <div className="loader">Please wait!</div>}

            <TodoList list={list} fetchData={fetchData} onTitleClick={onTitleClick} />
        </>
    );
};

export default TodoForm;