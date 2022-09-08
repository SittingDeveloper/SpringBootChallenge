/*global kakao*/
import React, {useEffect, useRef, useState} from 'react';
import './GIS.css';
import axios from "axios";
import Select from "react-select";
import {CustomOverlayMap, Map, MapMarker, MarkerClusterer, Polygon} from "react-kakao-maps-sdk";

function GIS() {

    // 지도 View, Sky View 전환 기능
    const mapRef = useRef()
    const setMapType = (maptype) => {
        const map = mapRef.current;
        const roadmapControl = document.getElementById("btnRoadmap");
        const skyviewControl = document.getElementById("btnSkyview");
        if (maptype === "roadmap") {
            map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
            roadmapControl.className = "selected_btn";
            skyviewControl.className = "btn";
        } else {
            map.setMapTypeId(kakao.maps.MapTypeId.HYBRID)
            skyviewControl.className = "selected_btn"
            roadmapControl.className = "btn"
        }
    }


    // ZoomIn / ZoomOut 기능
    const zoomIn = () => {
        const map = mapRef.current
        map.setLevel(map.getLevel() - 1)
    }
    const zoomOut = () => {
        const map = mapRef.current
        map.setLevel(map.getLevel() + 1)
    }


    // 지도위에 마커 그림
    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState()


    // 사이드바의 검색을 통해 맵 이동
    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState('')

    // 검색창 입력 반응
    const onChange = (e) => {
        setInputText(e.target.value)
    }

    // 검색창 Submit 을 통한 Place State 관리
    const handleSubmit = (e) => {
        e.preventDefault()
        setPlace(InputText)
        console.log("sidebar : " + InputText)
        setInputText('')
    }


    // Sub-Section 열고 닫는것을 관리 (Toggle 기능)
    const [isOpen, setMenu] = useState(false); // subMenu, default false

    // subTitle 재클릭시 닫는 기능
    const [toggle, setToggle] = useState(0);

    // Sub-Section 개별 실행 state
    const [flagNumber, setFlagNumber] = useState(0);

    // Sub-Section 재클릭시 닫는 기능을 수행하는 Function
    const toggleMenu = (checked_id) => {
        if (toggle == checked_id) {
            setToggle(checked_id);
            setMenu(isOpen => !isOpen);
        } else {
            setMenu(() => false);
            console.log("checked_id : " + checked_id)
            setFlagNumber(checked_id);
            setToggle(checked_id);
            setMenu(isOpen => !isOpen); // on,off Boolean 개념
        }
    };


    // Sub-Section 강제로 숨기는 기능
    const hideMenu = () => {
        setMenu(() => false)
    }


    // LocalInfra -  cur_Universe - bySeries
    const bySeries = [
        {label: "인문계열", value: 1},
        {label: "사회계열", value: 2},
        {label: "교육계열", value: 3},
        {label: "공학계열", value: 4},
        {label: "자연계열", value: 5},
        {label: "의약계열", value: 6},
        {label: "예체능계열", value: 7},
    ];


    // PostgreSQL 에서 가져온 값을 state 로 관리
    const [subTitle, setSubtitle] = useState([]);

    useEffect(() => {
        axios.get('/api/page')
            .then(response => setSubtitle(response.data))
            .catch(error => console.log(error));
    }, []);


    // 지도 검색
    useEffect(() => {
        if (!map) return
        const ps = new kakao.maps.services.Places()

        ps.keywordSearch(Place, (data, status, _pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                const bounds = new kakao.maps.LatLngBounds()
                let markers = []

                // 마커 생성
                for (var i = 0; i < data.length; i++) {
                    // @ts-ignore
                    markers.push({
                        position: {
                            lat: data[i].y,
                            lng: data[i].x,
                        },

                        // 지명
                        content: data[i].place_name,

                    })
                    // @ts-ignore
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
                }
                setMarkers(markers)

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds)
            }
        })
    }, [Place])

    return (
        <div>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <br/>
                    <img className="logo_icon" alt="logo" src="img/logo.png" width="180"/>
                    <a href="#">지역자원 정보시스템</a>
                </div>

                <ul className="list-unstyled">

                    <li>
                        <a href="#schoolSubmenu" data-toggle="collapse" aria-expanded="false"
                           className="dropdown-toggle collapsed" onClick={() => hideMenu()}>
                            <span className="icon"><i className="fa-solid fa-school"></i></span>
                            학교자료
                        </a>

                        <ul className="collapse list-unstyled" id="schoolSubmenu">
                            <li><a href="#">schoolSub 1</a></li>
                            <li><a href="#">schoolSub 2</a></li>
                            <li><a href="#">schoolSub 3</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#localSubmenu" data-toggle="collapse" aria-expanded="false"
                           className="dropdown-toggle collapsed" onClick={() => hideMenu()}>
                            <span className="icon"><i className="fa-solid fa-location-dot"></i></span>지역일반</a>

                        <ul className="collapse list-unstyled" id="localSubmenu">
                            <li><a href="#">지역 재정</a></li>
                            <li><a href="#">지역 경제</a></li>
                            <li><a href="#">지역 인구</a></li>
                            <li><a href="#">인구변화 추이</a></li>
                            <li><a href="#">지역 복지</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#infraSubmenu" data-toggle="collapse" aria-expanded="false"
                           className="dropdown-toggle collapsed" onClick={() => hideMenu()}>
                            <span className="icon"><i className="fa-solid fa-building"></i></span>지역인프라</a>

                        <ul className="collapse list-unstyled" id="infraSubmenu">
                            <li><a href="#">학원교습소현황</a></li>
                            <li><a href="#">평생교육기관현황</a></li>
                            <li>
                                <a href="#" onClick={() => toggleMenu("1")}>
                                    대학현황
                                </a>
                                <div className={(flagNumber == "1" && isOpen) ? "show-menu" : "hide-menu"}>

                                    <h5>
                                        대학현황
                                    </h5>

                                    <ul>

                                        <li>
                                            영역 선택
                                            <div className="middle-button">
                                                <button className="doubleButton">
                                                    시군구별
                                                </button>
                                                <button className="doubleButton">
                                                    행정동별
                                                </button>
                                            </div>
                                        </li>

                                        <li>
                                            설립별
                                            <div className="middle-button">
                                                <button className="tripleButton">
                                                    국립
                                                </button>
                                                <button className="tripleButton">
                                                    공립
                                                </button>
                                                <button className="tripleButton">
                                                    사립
                                                </button>
                                            </div>
                                        </li>

                                        <li>
                                            주야별
                                            <div className="middle-button">
                                                <button className="doubleButton">
                                                    주간
                                                </button>
                                                <button className="doubleButton">
                                                    야간
                                                </button>
                                            </div>
                                        </li>

                                        <li>

                                            <Select className="dropdown_items"
                                                    isSearchable={false}
                                                    placeholder={"계열별"}
                                                    options={bySeries}
                                            />

                                        </li>

                                    </ul>

                                </div>
                            </li>
                            <li>
                                <a href="#" onClick={() => toggleMenu("2")}>
                                    공공도서관현황
                                </a>
                                <div className={(flagNumber == "2" && isOpen) ? "show-menu" : "hide-menu"}>
                                    <h5>
                                        공공도서관현황
                                    </h5>

                                    {/*    next, input this    */}

                                </div>
                            </li>
                            <li><a href="#">지역아동센터현황</a></li>
                            <li><a href="#">체육시설현황</a></li>
                            <li><a href="#">향토문화유적현황</a></li>
                            <li><a href="#">문화시설현황</a></li>
                            <li><a href="#">학교폭력현황</a></li>
                            <li><a href="#">다문화학생현황</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#praticeMenu" data-toggle="collapse" aria-expanded="false"
                           className="dropdown-toggle collapsed" onClick={() => hideMenu()}>
                            <span className="icon"></span>ListMenu</a>

                        {/*SpringBoot에서 넘어온 값을 React로 받은 부분*/}
                        <ul className="collapse list-unstyled" id="praticeMenu">
                            {subTitle.map((item) =>
                                <li key={item.id}><a href="#">{item.subTitle}</a></li>
                            )}
                        </ul>

                    </li>

                    <li onClick={() => setPlace("클라모스")}>
                        <a href="#clamos">
                        <span className="icon">
                            <i className="fas fa-mobile-alt">
                            </i>
                        </span>
                            Clamos
                        </a>
                    </li>

                </ul>

                {/* 검색창 */}
                <form onSubmit={handleSubmit} type="submit">
                    <input placeholder="Search place .." onChange={onChange} value={InputText}/>
                    {/*    이곳에서 Place 가 결정된다    */}
                </form>
            </nav>

            {/*<MapContainer searchPlace={Place}/>*/}


            {/*지도를 표시할 Container*/}
            <Map
                center={{
                    // 지도의 중심좌표
                    lat: 37.48048629785744,
                    lng: 126.89286416497653,
                }}
                style={{
                    // 지도의 크기
                    width: "100%",
                    height: "100vh",

                }}
                className={"map-view"}
                level={2} // 지도의 확대 레벨
                onCreate={setMap}
                ref={mapRef}
                id={"kakaoMap"}
            >

                <MarkerClusterer
                    averageCenter={true}
                    minLevel={10}
                >

                    {/* 맵 마커 */}
                    {markers.map((marker) => (
                        <MapMarker
                            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                            position={marker.position}
                            onClick={() => setInfo(marker)}
                        >
                            {/*클릭한 마커*/}
                            {/*{info && info.content === marker.content && (
                                <div style={{color: "#00abff"}}>{marker.content}</div>
                            )}*/}

                        </MapMarker>
                    ))}
                </MarkerClusterer>

                {markers.map((marker) => (
                    <CustomOverlayMap
                        position={{lat: marker.position.lat, lng: marker.position.lng}}
                        yAnchor={1}
                    >
                        <div className="customoverlay">
                            <a
                                // href="https://map.kakao.com/link/map/11394059"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="title">{marker.content}</span>
                            </a>
                        </div>

                    </CustomOverlayMap>
                ))}
            </Map>

            {/*{downCount > 0 && (
                console.log(" 다각형에 mousedown 이벤트가 발생했습니다! " + {downCount})
            )}*/}


            {/* View 전환 컨트롤러 */}
            <div className="custom_typecontrol radius_border">
                <span
                    id="btnRoadmap"
                    className="selected_btn"
                    onClick={() =>
                        setMapType("roadmap")}
                >
                    지도
                </span>

                <span
                    id="btnSkyview"
                    className="btn"
                    onClick={() =>
                        setMapType("skyview")}
                >
                    스카이뷰
                </span>
            </div>


            {/* 지도 확대, 축소 컨트롤러 */}
            <div className="custom_zoomcontrol radius_border">
                <span onClick={zoomIn}>
                    <img
                        src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
                        alt="확대"
                    />
                </span>
                <span onClick={zoomOut}>
                    <img
                        src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
                        alt="축소"
                    />
                </span>
            </div>


        </div>
    );
}

export default GIS;