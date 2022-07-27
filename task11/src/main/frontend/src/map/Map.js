/* global kakao */
import React, {useEffect, useState} from 'react';

const {kakao} = window;

const Map = () => {
    const [map, setMap] = useState(null);

    //처음 지도 그리기
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            // 좌표
            center: new kakao.maps.LatLng(37.48048629785744, 126.89286416497653),
            // 확대 레벨 1 >>> 5 : 확대 >>> 축소
            level: 1
        };
        const kakaoMap = new kakao.maps.Map(container, options);
        setMap(kakaoMap);
    }, [])

    return (
        <div
            style={{
                width: '100%',
                display: 'inline-block',
                marginLeft: '5px',
                marginRight: '5px',
            }}
        >
            <div id="map" style={{width: '100%', height: '100vh'}}></div>
        </div>
    );
};

export default Map;