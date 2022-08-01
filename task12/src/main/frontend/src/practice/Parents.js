import React, { useState } from 'react';

export let cur_text;

function Parents() {
    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onReset = () => {
        cur_text = text;
        setText('');
    };

    return (
        <div>
            <input onChange={onChange} value={text}  />
            <button onClick={onReset}>초기화</button>
            <div>
                <h1>Parents 값: {text}</h1>
            </div>
        </div>
    );
}

export default Parents;