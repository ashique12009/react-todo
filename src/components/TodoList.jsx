import { useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toast, { Toaster } from 'react-hot-toast';

const TodoList = ({ list, fetchData, onTitleClick }) => {
    const [loader, setLoader] = useState(false);

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
                            setLoader(false);
                            fetchData('delete');
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
                        toast.error('Deletion cancelled');
                    },
                },
            ],
        });
    }

    const onIteamClick = (itemTitle, itemId) => {
        onTitleClick(itemTitle, itemId);
    }

    return (
        <>
            <Toaster />
            {loader && <div className="loader">Please wait!</div>}
            <ul id="myUL">
                {
                    list.map((item) => {
                        return <li key={item.id}><span className="ltitle" onClick={ () => onIteamClick(item.title, item.id) }>{item.title}</span> 
                            <i className="ri-delete-bin-line fright" onClick={ () => deleteTodoItem(item.id) }></i>
                        </li>
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