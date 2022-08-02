import React, {useEffect, useState} from 'react'

function LandingPage(){

    // 렌더링
    useEffect(() => {
        console.log("LandingPage" + "렌더링이 완료될 때 마다 실행")
    })

    return (
        <div value>
            {/*{message}*/}
            {/*{console.log("landing : " + sessionStorage.getItem("key"))}*/}
            {/*<MapContainer searchPlace={message}/>*/}
        </div>
    );

}

export default LandingPage;