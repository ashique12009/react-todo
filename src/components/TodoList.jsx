import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const TodoList = () => {

    const [list, setList] = useState([]);
    const [loader, setLoader] = useState(false);

    const fetchData = async () => {
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
            console.log('RES', response);

            if (!response.ok) {
                toast.error(`HTTP error! Status: ${response.status}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let result = await response.json();
            setList(result.todos);
            setLoader(false);
        } catch (error) {
            setLoader(false);
            console.error('Fetch error:', error.message);
            toast.error('Error fetching data. Please try again.');
        }
    }

    useEffect(() => {
        console.log('TodoList mounted');    
        fetchData();
    }, [])

    const deleteTodoItem = (itemId) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this todo item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        setLoader(true);
                        // Perform the deletion logic here
                        try {
                            // Make DELETE request
                            const deleteURL = `http://localhost/classic-php-todo-rest-api/index.php`;
                            const deleteHeaders = new Headers();
                            deleteHeaders.append('token', 'secret_token');

                            let payload = JSON.stringify({ 'id': itemId });

                            const deleteOptions = {
                                method: 'DELETE',
                                headers: deleteHeaders,
                                redirect: 'follow',
                                body: payload
                            };

                            const deleteResponse = await fetch(deleteURL, deleteOptions);

                            if (!deleteResponse.ok) {
                                toast.error(`HTTP error! Status: ${deleteResponse.status}`);
                                throw new Error(`HTTP error! Status: ${deleteResponse.status}`);
                            }

                            // Refresh the todo list
                            fetchData();
                            setLoader(false);

                            // Display a success message
                            toast.success('Todo item deleted successfully');
                        } catch (error) {
                            setLoader(false);
                            console.error('Delete error:', error.message);
                            toast.error('Error deleting todo item. Please try again.');
                        }
                    },
                },
                {
                    label: 'No',
                    onClick: () => {
                        // Display a cancellation message
                        toast.info('Deletion cancelled');
                    },
                },
            ],
        });
    }

    return (
        <>
            <ToastContainer />
            {loader && <div className="loader">Please wait!</div>}
            <ul id="myUL">
                {
                    list.map((item) => {
                        return <li key={item.id}>{item.title} <i className="ri-delete-bin-line fright" onClick={ () => deleteTodoItem(item.id) }></i></li>
                    })
                }
                {/* <li>Hit the gym <i className="ri-delete-bin-line fright"></i></li>
                <li className="checked">Pay bills</li> 
                */}
            </ul>
        </>
    );
};

export default TodoList;