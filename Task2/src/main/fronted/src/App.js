// src/main/frontend/src/App.js

import './App.css'
import React, {useEffect, useState} from 'react';
import axios, {Axios} from 'axios';

function App() {

    // 요청받은 정보를 담아줄 변수 선언
    const [list, setList] = useState([])

    // 첫 번째 렌더링을 마친 후 실행
    useEffect(() => {
        axios.get('/api/home')
            .then(response => setList(response.data))
            .catch(error => console.log(error))
    }, []);

    console.log(list)

    return (
        <>
            <header className="App-header">
                <h1>Show Member</h1>
                {list.map((item) =>
                    <p>
                        Member_id : {item.id} <br/>
                        String_Data : {item.str_Data} <br/>
                        Int_Data : {item.int_Data}
                    </p>)}
            </header>
        </>
    );
}

export default App;