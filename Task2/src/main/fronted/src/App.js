// src/main/frontend/src/App.js

import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {

    // 요청받은 정보를 담아줄 변수 선언
    const [hello, setHello] = useState('')

    // 첫 번째 렌더링을 마친 후 실행
    useEffect(() => {
        axios.get('/api/hello')
            .then(response => setHello(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <header className="App-header">
            백엔드에서 값을 가져옵니다 : {hello}
        </header>
    );
}

export default App;