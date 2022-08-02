import React from 'react'
import MapContainer from "./MapContainer";

function LandingPage(){
    // 렌더링
    /*useEffect(() => {
        console.log("LandingPage" + "렌더링이 완료될 때 마다 실행")
    })*/

    // const myPlace = useContext(getPlace);



    return (
        <div>
            {console.log("LandingPage")}
            <MapContainer searchPlace={"서울대학교"}/>
        </div>
    );

}

export default LandingPage;