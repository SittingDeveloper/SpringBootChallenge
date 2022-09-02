/*global kakao*/
import React, {useEffect, useState} from 'react';
import './Main_Title.css';
import axios from "axios";
import Select from "react-select";
import {Map, Polygon} from "react-kakao-maps-sdk";
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


    // /*// lat, lng part
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

    const [isYeoncheonMouseOver, setYeoncheonIsMouseOver] = useState(false);
    const [isPocheonMouseOver, setPocheonIsMouseOver] = useState(false);
    const [isGapayeonMouseOver, setGapyeonIsMouseOver] = useState(false);
    const [isYangpyeonMouseOver, setYangpyeonIsMouseOver] = useState(false);
    const [isYeojuMouseOver, setYeojuIsMouseOver] = useState(false);
    const [isIcheonMouseOver, setIcheonMouseOver] = useState(false);
    const [isYonginMouseOver, setYonginMouseOver] = useState(false);
    const [isAnseonMouseOver, setAnseonMouseOver] = useState(false);
    const [isPyeongtaekMouseOver, setPyeongMouseOver] = useState(false);
    const [isHwaseonMouseOver, setHwaseonMouseOver] = useState(false);
    const [isAnsanMouseOver, setAnsanMouseOver] = useState(false);
    const [isAnyanMouseOver, setAnyanMouseOver] = useState(false);
    const [isGunpoMouseOver, setGunpoMouseOver] = useState(false);
    const [isGwacheonMouseOver, setGwacheonMouseOver] = useState(false);
    const [isUiwangMouseOver, setUiwangMouseOver] = useState(false);
    const [isSuwonMouseOver, setSuwonMouseOver] = useState(false);
    const [isGuriMouseOver, setGuriMouseOver] = useState(false);
    const [isSeongnamMouseOver, setSeongnamMouseOver] = useState(false);
    const [isGwangjuMouseOver, setGwanjuMouseOver] = useState(false);
    const [isHanamMouseOver, setHanamMouseOver] = useState(false);
    const [isGwangmyeongMouseOver, setGwangmyeongMouseOver] = useState(false);
    const [isBucheonMouseOver, setBucheonMouseOver] = useState(false);
    const [isSiheungMouseOver, setSiheungMouseOver] = useState(false);
    const [isOsanMouseOver, setOsanMouseOver] = useState(false);
    const [isDongducheonMouseOver, setDongducheonMouseOver] = useState(false);
    const [isPajuMouseOver, setPajuMouseOver] = useState(false);
    const [isYangjuMouseOver, setYangjuMouseOver] = useState(false);
    const [isGimpoMouseOver, setGimpoMouseOver] = useState(false);
    const [isGoyangMouseOver, setGoyangMouseOver] = useState(false);
    const [isUijeonbuMouseOver, setUijeongbuMouseOver] = useState(false);
    const [isNamyangjuMouseOver, setNamyangjuMouseOver] = useState(false);

    const [downCount, setDownCount] = useState(0);
    const [textPlace, setTextPlace] = useState("");

    useEffect(() => {
        const tileset = new kakao.maps.Tileset({
            width: 256,
            height: 256,
            getTile: (x, y, z) => {
                const div = document.createElement('div');
                // div.style.fontSize = '36px';
                // div.style.fontWeight = 'bold';
                // div.style.lineHeight = '256px'
                // div.style.textAlign = 'center';
                // div.style.color = '#4D4D4D';
                // div.style.border = '1px dashed #ff5050';
                div.style.background = "rgb(0,0,0)";
                // div.style.background = "grey";
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
                    top: "110px",
                    left: "350px",
                    width: "500px",
                    height: "820px"
                }}>


                    <Map // 지도를 표시할 Container
                        center={{
                            lat: 37.56344698078499,
                            lng: 127.14015019063882,
                        }}
                        style={{
                            width: "450px",
                            height: "45vh",
                            left: "25px"
                        }}
                        draggable={false}
                        zoomable={false}
                        disableDoubleClickZoom={true}
                        disableDoubleClick={true}
                        level={11.8} // 지도의 확대 레벨
                        onCreate={map => map.addOverlayMapTypeId(kakao.maps.MapTypeId["TILE_NUMBER"])}
                    >

                        <Polygon
                            path={Yeoncheon}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isYeoncheonMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isYeoncheonMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setYeoncheonIsMouseOver(true)}
                            onMouseout={() => setYeoncheonIsMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트1 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("연천 Click");
                            }}
                        />

                        <Polygon
                            path={Pocheon}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isPocheonMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isPocheonMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setPocheonIsMouseOver(true)}
                            onMouseout={() => setPocheonIsMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("포천 Click");
                            }}
                        />

                        <Polygon
                            path={Gapyeon}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isGapayeonMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isGapayeonMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setGapyeonIsMouseOver(true)}
                            onMouseout={() => setGapyeonIsMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("가평 Click");
                            }}
                        />

                        <Polygon
                            path={Yangpyeon}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isYangpyeonMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isYangpyeonMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setYangpyeonIsMouseOver(true)}
                            onMouseout={() => setYangpyeonIsMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("양평 Click");
                            }}
                        />

                        <Polygon
                            path={Yeoju}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isYeojuMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isYeojuMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setYeojuIsMouseOver(true)}
                            onMouseout={() => setYeojuIsMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("여주 Click");
                            }}
                        />

                        <Polygon
                            path={Icheon}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isIcheonMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isIcheonMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setIcheonMouseOver(true)}
                            onMouseout={() => setIcheonMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("이천 Click");
                            }}
                        />

                        <Polygon
                            path={Yongin}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isYonginMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isYonginMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setYonginMouseOver(true)}
                            onMouseout={() => setYonginMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("용인 Click");
                            }}
                        />

                        <Polygon
                            path={Yongin_2}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isYonginMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isYonginMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setYonginMouseOver(true)}
                            onMouseout={() => setYonginMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("용인 Click");
                            }}
                        />

                        <Polygon
                            path={Yongin_3}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isYonginMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isYonginMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setYonginMouseOver(true)}
                            onMouseout={() => setYonginMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("용인 Click");
                            }}
                        />

                        <Polygon
                            path={Anseon}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isAnseonMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isAnseonMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setAnseonMouseOver(true)}
                            onMouseout={() => setAnseonMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("안성 Click");
                            }}
                        />

                        <Polygon
                            path={Pyeongtaek}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isPyeongtaekMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isPyeongtaekMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setPyeongMouseOver(true)}
                            onMouseout={() => setPyeongMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("평택 Click");
                            }}
                        />

                        <Polygon
                            path={Hwaseon}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isHwaseonMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isHwaseonMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setHwaseonMouseOver(true)}
                            onMouseout={() => setHwaseonMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("화성 Click");
                            }}
                        />

                        <Polygon
                            path={Ansan}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isAnsanMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isAnsanMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setAnsanMouseOver(true)}
                            onMouseout={() => setAnsanMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("안산 Click");
                            }}
                        />

                        <Polygon
                            path={Ansan_2}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isAnsanMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isAnsanMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setAnsanMouseOver(true)}
                            onMouseout={() => setAnsanMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("안산 Click");
                            }}
                        />

                        <Polygon
                            path={AnYan}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isAnyanMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isAnyanMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setAnyanMouseOver(true)}
                            onMouseout={() => setAnyanMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("안양 Click");
                            }}
                        />

                        <Polygon
                            path={Gunpo}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isGunpoMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isGunpoMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setGunpoMouseOver(true)}
                            onMouseout={() => setGunpoMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("군포 Click");
                            }}
                        />

                        <Polygon
                            path={Gwacheon}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isGwacheonMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isGwacheonMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setGwacheonMouseOver(true)}
                            onMouseout={() => setGwacheonMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("과천 Click");
                            }}
                        />

                        <Polygon
                            path={Uiwang}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isUiwangMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isUiwangMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setUiwangMouseOver(true)}
                            onMouseout={() => setUiwangMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("의왕 Click");
                            }}
                        />

                        <Polygon
                            path={Suwon}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isSuwonMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isSuwonMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setSuwonMouseOver(true)}
                            onMouseout={() => setSuwonMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("수원 Click");
                            }}
                        />

                        <Polygon
                            path={Guri}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isGuriMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isGuriMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setGuriMouseOver(true)}
                            onMouseout={() => setGuriMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("구리 Click");
                            }}
                        />

                        <Polygon
                            path={SeongNam}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isSeongnamMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isSeongnamMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setSeongnamMouseOver(true)}
                            onMouseout={() => setSeongnamMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("성남 Click");
                            }}
                        />

                        <Polygon
                            path={Gwangju}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isGwangjuMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isGwangjuMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setGwanjuMouseOver(true)}
                            onMouseout={() => setGwanjuMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("광주 Click");
                            }}
                        />

                        <Polygon
                            path={Hanam}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isHanamMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isHanamMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setHanamMouseOver(true)}
                            onMouseout={() => setHanamMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("하남 Click");
                            }}
                        />

                        <Polygon
                            path={Gwangmyeong}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isGwangmyeongMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isGwangmyeongMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setGwangmyeongMouseOver(true)}
                            onMouseout={() => setGwangmyeongMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("광명 Click");
                            }}
                        />

                        <Polygon
                            path={Bucheon}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isBucheonMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isBucheonMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setBucheonMouseOver(true)}
                            onMouseout={() => setBucheonMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("부천 Click");
                            }}
                        />

                        <Polygon
                            path={Siheung}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isSiheungMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isSiheungMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setSiheungMouseOver(true)}
                            onMouseout={() => setSiheungMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("시흥 Click");
                            }}
                        />

                        <Polygon
                            path={Osan}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isOsanMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isOsanMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setOsanMouseOver(true)}
                            onMouseout={() => setOsanMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("오산 Click");
                            }}
                        />

                        <Polygon
                            path={Dongducheon}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isDongducheonMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isDongducheonMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setDongducheonMouseOver(true)}
                            onMouseout={() => setDongducheonMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("동두천 Click");
                            }}
                        />

                        <Polygon
                            path={Paju}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isPajuMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isPajuMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setPajuMouseOver(true)}
                            onMouseout={() => setPajuMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("파주 Click");
                            }}
                        />

                        <Polygon
                            path={Yangju}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isYangjuMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isYangjuMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setYangjuMouseOver(true)}
                            onMouseout={() => setYangjuMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("양주 Click");
                            }}
                        />

                        <Polygon
                            path={Gimpo}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isGimpoMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isGimpoMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setGimpoMouseOver(true)}
                            onMouseout={() => setGimpoMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("김포 Click");
                            }}
                        />

                        <Polygon
                            path={Goyang}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isGoyangMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isGoyangMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setGoyangMouseOver(true)}
                            onMouseout={() => setGoyangMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("고양 Click");
                            }}
                        />

                        <Polygon
                            path={Uijeonbu}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isUijeonbuMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isUijeonbuMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setUijeongbuMouseOver(true)}
                            onMouseout={() => setUijeongbuMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("의정부 Click");
                            }}
                        />

                        <Polygon
                            path={Namyangju}
                            strokeWeight={2} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔입니다
                            strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={isNamyangjuMouseOver ? "#89a8e5" : "rgb(137,162,175)"} // 채우기 색깔입니다
                            fillOpacity={isNamyangjuMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                            onMouseover={() => setNamyangjuMouseOver(true)}
                            onMouseout={() => setNamyangjuMouseOver(false)}
                            onMousedown={(_polygon, mouseEvent) => {
                                console.log(" 클릭이벤트2 " + mouseEvent)
                                setDownCount(downCount + 1)
                                setTextPlace("남양주 Click");
                            }}
                        />

                        <h1 style={{
                            color: "rgb(233,233,233)"
                        }}>
                            {textPlace}
                        </h1>

                    </Map>
                </div>
            </div>
        </div>
    );
}

export default Main_Title;