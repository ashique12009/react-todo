import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoList = () => {

    const [list, setList] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {

        console.log('TodoList mounted');
        let requestURL = 'http://localhost/classic-php-todo-rest-api/index.php';

        var myHeaders = new Headers();
        myHeaders.append("token", "secret_token");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const fetchData = async () => {
            setLoader(true);
            try {
                let response = await fetch(requestURL, requestOptions);
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                let result = await response.json();
                setList(result.todos);
                console.log(result);
            } catch (error) {
                setLoader(false);
                console.error('Fetch error:', error.message);
                toast.error('Error fetching data. Please try again.');
            }
        };
    
        fetchData();

    }, [])

    return (
        <>
            <ToastContainer />
            {loader && <div className="loader">Please wait!</div>}
            <ul id="myUL">
                {
                    list.map((item) => {
                        return <li key={item.id}>{item.title} <i className="ri-delete-bin-line fright"></i></li>
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