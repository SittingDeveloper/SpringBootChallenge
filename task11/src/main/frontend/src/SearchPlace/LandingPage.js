import React, {useEffect, useState} from 'react'
import MapContainer from './MapContainer'
import axios from "axios";

function LandingPage() {

    const [message, setMessage] = useState("");

    useEffect(() => {

        // fetch(url,options) : HTTP 요청 함수
        fetch('/api/search')
            .then(response => response.text())
            .then(message => {
                setMessage(message);
            });

        console.log("Landing Page : " + message)
    }, [])


    return (
        <div>
            {message}
            {/*<MapContainer searchPlace={message}/>*/}
        </div>
    );
}

export default LandingPage;