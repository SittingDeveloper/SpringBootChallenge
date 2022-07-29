import React from 'react'
import MapContainer from './MapContainer'
import Sidebar, {getPlace} from '../sidebar/Sidebar'

function LandingPage() {
    return (
        <div>
            <MapContainer searchPlace={"화성"}/>
       </div>
    )
}

export default LandingPage;