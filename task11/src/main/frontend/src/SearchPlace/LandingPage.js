import React, {useEffect, useState} from 'react'
import MapContainer from './MapContainer'
import axios from "axios";

function LandingPage() {

    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get('/api/search')
            .then(response => {
                setMessage(response.data);
            })
    }, []);

    return (
        <div>
            {message}
            {/*<MapContainer searchPlace={message}/>*/}
        </div>
    );
}

export default LandingPage;