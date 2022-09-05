/*global kakao*/
import React, {useEffect, useState} from 'react';
import './Main_Title.css';
import axios from "axios";
import Select from "react-select";
import {CustomOverlayMap, Map, MapInfoWindow, Polygon} from "react-kakao-maps-sdk";
import {
    map_Ansan,
    map_Anseon,
    map_AnYan, map_Bucheon, map_Dongducheon,
    map_Gapyeon, map_Gimpo, map_Goyang,
    map_Gunpo, map_Guri, map_Gwangju, map_Gwangmyeong, map_Hanam,
    map_Hwaseon,
    map_Icheon, map_Namyangju, map_Osan, map_Paju,
    map_Pocheon,
    map_Pyeongtaek,
    map_SeongNam, map_Siheung,
    map_Suwon, map_Uijeonbu,
    map_Uiwang, map_Yangju,
    map_Yangpyeon,
    map_Yeoju,
    map_Yeoncheon,
    map_Yongin
} from "./latitude";

function Main_Title() {

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

    // 지역별 위도경도 배열
    const [areas, setAreas] = useState([
        {
            name: "연천",
            isMouseOver: false,
            path: map_Yeoncheon
        },
        {
            name: "포천",
            isMouseOver: false,
            path: map_Pocheon
        },
        {
            name: "가평",
            isMouseOver: false,
            path: map_Gapyeon
        },
        {
            name: "양평",
            isMouseOver: false,
            path: map_Yangpyeon
        },
        {
            name: "여주",
            isMouseOver: false,
            path: map_Yeoju
        },
        {
            name: "이천",
            isMouseOver: false,
            path: map_Icheon
        },
        {
            name: "용인",
            isMouseOver: false,
            path: map_Yongin
        },
        {
            name: "안성",
            isMouseOver: false,
            path: map_Anseon
        },
        {
            name: "평택",
            isMouseOver: false,
            path: map_Pyeongtaek
        },
        {
            name: "화성",
            isMouseOver: false,
            path: map_Hwaseon
        },
        {
            name: "안산",
            isMouseOver: false,
            path: map_Ansan
        },
        {
            name: "안양",
            isMouseOver: false,
            path: map_AnYan
        },
        {
            name: "군포",
            isMouseOver: false,
            path: map_Gunpo
        },
        {
            name: "과천",
            isMouseOver: false,
            path: map_Gunpo
        },
        {
            name: "의왕",
            isMouseOver: false,
            path: map_Uiwang
        },
        {
            name: "수원",
            isMouseOver: false,
            path: map_Suwon
        },
        {
            name: "구리",
            isMouseOver: false,
            path: map_Guri
        },
        {
            name: "성남",
            isMouseOver: false,
            path: map_SeongNam
        },
        {
            name: "광주",
            isMouseOver: false,
            path: map_Gwangju
        },
        {
            name: "하남",
            isMouseOver: false,
            path: map_Hanam
        },
        {
            name: "광명",
            isMouseOver: false,
            path: map_Gwangmyeong
        },
        {
            name: "부천",
            isMouseOver: false,
            path: map_Bucheon
        },
        {
            name: "시흥",
            isMouseOver: false,
            path: map_Siheung
        },
        {
            name: "오산",
            isMouseOver: false,
            path: map_Osan
        },
        {
            name: "동두천",
            isMouseOver: false,
            path: map_Dongducheon
        },
        {
            name: "파주",
            isMouseOver: false,
            path: map_Paju
        },
        {
            name: "양주",
            isMouseOver: false,
            path: map_Yangju
        },
        {
            name: "김포",
            isMouseOver: false,
            path: map_Gimpo
        },
        {
            name: "고양",
            isMouseOver: false,
            path: map_Goyang
        },
        {
            name: "의정부",
            isMouseOver: false,
            path: map_Uijeonbu
        },
        {
            name: "남양주",
            isMouseOver: false,
            path: map_Namyangju
        }
    ])

    // Map Hover 지역명 나타내기
    const [mousePosition, setMousePosition] = useState({
        lat : 0,
        lng : 0,
    })

    const [textPlace, setTextPlace] = useState("");

    useEffect(() => {
        const tileset = new kakao.maps.Tileset({
            width: 256,
            height: 256,
            getTile: (x, y, z) => {
                const div = document.createElement('div');

                // GIS맵  배경이미지
                div.style.background = "rgb(0,0,0)";
                return div;
            }
        })
        kakao.maps.Tileset.add("TILE_NUMBER", tileset)
    }, [])


    return (
        <div>
            <nav id="main_sidebar">
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

                </ul>

            </nav>

            <div className="MainStatus">

                <div style={{
                    backgroundColor: "rgb(0, 0, 0)",
                    position: "absolute",
                    borderRadius: "20px",
                    top: "11.5%",
                    left: "350px",
                    width: "500px",
                    height: "85%",
                    overflow: "hidden"
                }}>


                    <Map // 지도를 표시할 Container
                        center={{
                            lat: 37.56344698078499,
                            lng: 127.14015019063882,
                        }}
                        style={{
                            left: "5px",
                            width: "490px",
                            height: "45vh",
                        }}
                        draggable={false}
                        zoomable={false}
                        disableDoubleClickZoom={true}
                        disableDoubleClick={true}
                        level={11.5} // 지도의 확대 레벨
                        onCreate={map => map.addOverlayMapTypeId(kakao.maps.MapTypeId["TILE_NUMBER"])}
                        onMouseMove={(_map, mouseEvent) =>
                            setMousePosition({
                                lat: mouseEvent.latLng.getLat(),
                                lng: mouseEvent.latLng.getLng(),
                            })
                        }
                    >

                        {areas.map((area, index) => (
                            <Polygon
                                key={`area-${area.name}`}
                                path={area.path}
                                strokeWeight={2}
                                strokeColor={"#000000"}
                                strokeOpacity={0.8}
                                fillColor={area.isMouseover ? "#4394ff" : "rgb(137,162,175)"}
                                fillOpacity={0.8}
                                onMouseover={() =>
                                    setAreas((prev) => [
                                        ...prev.filter((_, i) => i !== index),
                                        {
                                            ...prev[index],
                                            isMouseover: true,
                                        },
                                    ])
                                }
                                onMouseout={() =>
                                    setAreas((prev) => [
                                        ...prev.filter((_, i) => i !== index),
                                        {
                                            ...prev[index],
                                            isMouseover: false,
                                        },
                                    ])
                                }

                                onMousedown={() => {
                                    setTextPlace(area.name);
                                }}

                            />
                        ))}

                        {areas.findIndex((v) => v.isMouseover) !== -1 && (
                            <CustomOverlayMap position={mousePosition}>
                                <div className="area">{areas.find((v) => v.isMouseover).name}</div>
                            </CustomOverlayMap>
                        )}

                        <div className="Gis_detail">
                            <h1>
                                {textPlace}
                            </h1>
                        </div>


                    </Map>
                </div>
            </div>
        </div>
    );
}

export default Main_Title;