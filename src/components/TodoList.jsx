import { useEffect, useState } from "react";

const TodoList = () => {

    const [list, setList] = useState([]);

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

        (async () => {
            // fetch('https://jsonplaceholder.typicode.com/todos')
            let response = await fetch(requestURL, requestOptions);
            let result = await response.json();

            console.log(result);
        })()

    }, [])

    return (
        <>
            <ul id="myUL">
                <li>Hit the gym <i className="ri-delete-bin-line fright"></i></li>
                <li className="checked">Pay bills</li>
                <li>Meet George</li>
            </ul>
        </>
    );
};

export default TodoList;