/*global kakao*/
import React, {useEffect, useRef, useState} from 'react';
import './Main.css';
import axios from "axios";
import Select from "react-select";
import {Map, MapMarker, MarkerClusterer, Polygon} from "react-kakao-maps-sdk";

function Main() {

    // 사이드바의 검색을 통해 맵 이동
    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState('')

    // 검색창 입력 반응
    const onChange = (e) => {
        setInputText(e.target.value)
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


    // /*// lat, lng part
    /*const Yeoncheon = [
        { lat : 38.241652167846698 , lng : 127.14734021448261 } ,
        { lat : 38.24234375495036 , lng : 127.14892257032337 } ,
        { lat : 38.18614599826008 , lng : 127.1805597266686 } ,
        { lat : 38.18600737502606 , lng : 127.18020084801512 } ,
        { lat : 38.12142996526199 , lng : 127.17202538168918 } ,
        { lat : 38.06453941551016 , lng : 127.18880404567466 } ,
        { lat : 38.0711344735717 , lng : 127.13967887311039 } ,
        { lat : 38.070139725964768 , lng : 127.13846883676702 } ,
        { lat : 38.03887707258247 , lng : 127.11712618380347 } ,
        { lat : 38.03871319541941 , lng : 127.11889116355282 } ,
        { lat : 38.01447535335944 , lng : 127.14665252351833 } ,
        { lat : 37.99243658990871, lng : 127.14502550979269 } ,
        { lat : 37.97893978046208, lng : 127.12027228650084} ,
        { lat : 37.98887924162454, lng : 127.11143667163988} ,
        { lat : 37.983285500213259, lng : 127.08979615585254} ,
        { lat : 37.974593518596758, lng : 127.09274201372945} ,
        { lat : 37.972397121435417, lng : 127.09123531536099} ,
        { lat : 37.97204257058996, lng : 127.09146020286181} ,
        { lat : 37.97162792105937, lng : 127.0912339127994} ,
        { lat : 37.97162133382177, lng : 127.09073821282972} ,
        { lat : 37.98104925857845, lng : 127.05367752212736} ,
        { lat : 37.928230069595027, lng : 127.00972464618795} ,
        { lat : 37.94208451000882, lng : 126.97250283221463} ,
        { lat : 37.977480013626088, lng : 127.01207688350476} ,
        { lat : 38.00916577201093, lng : 126.98608432657032} ,
        { lat : 37.98110682189121, lng : 126.93818141473914} ,
        { lat : 37.99490312322211, lng : 126.89562400151644} ,
        { lat : 37.984875006158997, lng : 126.85473727025675} ,
        { lat : 37.98600295609292, lng : 126.85280328675252} ,
        { lat : 37.957459253210519, lng : 126.82073720373785} ,
        { lat : 37.990069175198069, lng : 126.8015033050122} ,
        { lat : 38.03508967179377, lng : 126.85237652437694} ,
        { lat : 38.080120159573599, lng : 126.86889640218247} ,
        { lat : 38.09698472558775, lng : 126.8563239473323} ,
        { lat : 38.137548744484458, lng : 126.90460393312569} ,
        { lat : 38.134654070827938, lng : 126.95753073692007} ,
        { lat : 38.157818271977429, lng : 126.95155382165756} ,
        { lat : 38.19976586794878, lng : 126.98558494792589} ,
        { lat : 38.222678831327787, lng : 126.9789127057553} ,
        { lat : 38.21791537685556, lng : 127.04822328105512} ,
        { lat : 38.24051486246965, lng : 127.06278847573899} ,
        { lat : 38.24156894545558, lng : 127.11054584028774} ,
        { lat : 38.241652167846698, lng : 127.14734021448261} ,
    ]
    const Pocheon = [
        { lng : 127.12405512091068, lat : 37.77295949399783},
        { lng : 127.10643369421202, lat : 37.780185550111 },
        { lng : 127.10574327952551, lat : 37.78029137628622},
        { lng : 127.10574201967701, lat : 37.78029957609339},
        { lng : 127.10575243747367, lat : 37.78075840536311 },
        { lng : 127.10602570420599, lat : 37.78163878392516 },
        { lng : 127.10594833258739, lat : 37.783253453862339 },
        { lng : 127.11320231211536, lat : 37.7887847345326 },
        { lng : 127.11770995522244, lat : 37.79599013801205 },
        { lng : 127.12219254809718, lat : 37.825466848937498 },
        { lng : 127.10885671647339, lat : 37.860324501921237},
        { lng : 127.10957058039728, lat : 37.86078161819669 },
        { lng : 127.12330832973035, lat : 37.86705678947254 },
        { lng : 127.12339610055156, lat : 37.86730586311708 },
        { lng : 127.15482319462393, lat : 37.89471485480661 },
        { lng : 127.15533264619413, lat : 37.895560224356277 },
        { lng : 127.15537079737053, lat : 37.89562408698208 },
        { lng : 127.15520022370717, lat : 37.89560629102685 },
        { lng : 127.14546611474155, lat : 37.912015628823279 },
        { lng : 127.14492071471608, lat : 37.91224152816503 },
        { lng : 127.1215020213279, lat : 37.91652013850301 },
        { lng : 127.09879453957395, lat : 37.95338018194903 },
        { lng : 127.09834125214064, lat : 37.954776995000049 },
        { lng : 127.09131899725567, lat : 37.97162905438438 },
        { lng : 127.0912339127994, lat : 37.97162792105937 },
        { lng : 127.09146020286181, lat : 37.97204257058996 },
        { lng : 127.09123531536099, lat :  37.972397121435417},
        { lng : 127.09274201372945, lat : 37.974593518596758 },
        { lng : 127.08979615585254, lat : 37.983285500213259 },
        { lng : 127.11143667163988, lat : 37.98887924162454 },
        { lng : 127.12027228650084, lat :  37.97893978046208},
        { lng : 127.14502550979269, lat : 37.99243658990871 },
        { lng : 127.14665252351833, lat : 38.01447535335944 },
        { lng : 127.11889116355282, lat : 38.03871319541941 },
        { lng : 127.11712618380347, lat : 38.03887707258247 },
        { lng : 127.13846883676702, lat : 38.070139725964768 },
        { lng : 127.13967887311039, lat : 38.0711344735717 },
        { lng : 127.18880404567466, lat : 38.06453941551016 },
        { lng : 127.17202538168918, lat : 38.12142996526199 },
        { lng : 127.18020084801512, lat : 38.18600737502606 },
        { lng : 127.18138816335517, lat : 38.18595581534259 },
        { lng : 127.18922517139024, lat : 38.1883212295497 },
        { lng : 127.18927809760543, lat : 38.18801779673944 },
        { lng : 127.18829044782292, lat : 38.17960886684888 },
        { lng : 127.18821152895474, lat : 38.17945780447528 },
        { lng : 127.2209338988565, lat : 38.138373145201267 },
        { lng : 127.25862090758564, lat : 38.16854435140923 },
        { lng : 127.25860012655017, lat : 38.16889826788944 },
        { lng : 127.28611198054009, lat : 38.180281204291379 },
        { lng : 127.28610904027207, lat : 38.179525192393999},
        { lng : 127.27964644662878, lat : 38.1251278788848 },
        { lng : 127.28014094869696, lat : 38.125142662241149 },
        { lng : 127.30755256898516, lat : 38.119019442673828 },
        { lng : 127.3078068607504, lat : 38.11894078915274 },
        { lng : 127.32067032621817, lat : 38.09468376918623 },
        { lng : 127.37861375154874, lat : 38.11842895625782 },
        { lng : 127.37881591228744, lat : 38.118304667930299 },
        { lng : 127.42991135843998, lat : 38.11481907698534 },
        { lng : 127.4305650248923, lat : 38.11539485231671 },
        { lng : 127.43430315201627, lat : 38.11062879737777 },
        { lng : 127.44045270401255, lat : 38.10883224422601 },
        { lng : 127.44707594093829, lat : 38.080728641111097 },
        { lng : 127.44599706285556, lat : 38.051797448759248 },
        { lng : 127.44538943863798, lat : 38.05002865955282 },
        { lng : 127.41283733401471, lat : 37.9978215965746 },
        { lng : 127.38760146731862, lat : 37.983945889371309 },
        { lng : 127.38457812256982, lat : 37.94326726638973},
        { lng : 127.35647163519642, lat : 37.92162899323808 },
        { lng : 127.32865752988796, lat : 37.92193424471419 },
        { lng : 127.32288722330591, lat : 37.87136759385026 },
        { lng : 127.2866598149244, lat : 37.86749475352148 },
        { lng : 127.26691403998741, lat : 37.779871395673918 },
        { lng : 127.26617788371373, lat : 37.78035709680839 },
        { lng : 127.2608136363406, lat : 37.77400970243304 },
        { lng : 127.26081605713115, lat : 37.77399110140939 },
        { lng : 127.21164170195313, lat : 37.769368606787278 },
        { lng : 127.21026859213134, lat : 37.769443123350907 },
        { lng : 127.18099441822729, lat :  37.76344591957207},
        { lng : 127.18028823456425, lat : 37.763119828219299 },
        { lng : 127.15009753018, lat : 37.75511001647369 },
        { lng : 127.14937014368708, lat : 37.75551720043588 },
        { lng : 127.14617769717703, lat : 37.75549779075147 },
        { lng : 127.14015019063882, lat : 37.76344698078499 },
        { lng : 127.13965579340001, lat : 37.7640106597246 },
        { lng : 127.12425508824183, lat : 37.7731228635352 },
        { lng : 127.12405512091068, lat : 37.77295949399783 }
    ]

    const [isYeoncheonMouseOver, setYeoncheonIsMouseOver] = useState(false);
    const [isPocheonMouseOver, setPocheonIsMouseOver] = useState(false);*/


    const [downCount, setDownCount] = useState(0);

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

            </nav>

            <div className="MainStatus">
                {/*<Map
                    center={{
                        // 지도의 중심좌표
                        lat: 37.48048629785744,
                        lng: 126.89286416497653,
                    }}
                    style={{
                        // 지도의 크기
                        left: 400,
                        top: 200,
                        width: "30%",
                        height: "50vh",
                    }}
                    className={"map-view"}
                    level={1} // 지도의 확대 레벨
                    id={"kakaoMap"}>

                    <Polygon
                        path={Yeoncheon}
                        strokeWeight={3} // 선의 두께입니다
                        strokeColor={"#89a8e5"} // 선의 색깔입니다
                        strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                        strokeStyle={"solid"} // 선의 스타일입니다
                        fillColor={isYeoncheonMouseOver ? "#89a8e5" : "rgba(0,0,0,0.12)"} // 채우기 색깔입니다
                        fillOpacity={isYeoncheonMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                        onMouseover={() => setYeoncheonIsMouseOver(true)}
                        onMouseout={() => setYeoncheonIsMouseOver(false)}
                        onMousedown={(_polygon, mouseEvent) => {
                            console.log(" 클릭이벤트1 " + mouseEvent)
                            setDownCount(downCount + 1)
                        }}
                        zIndex={5}
                    />

                    <Polygon
                        path={Pocheon}
                        strokeWeight={3} // 선의 두께입니다
                        strokeColor={"#89a8e5"} // 선의 색깔입니다
                        strokeOpacity={0.8} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                        strokeStyle={"solid"} // 선의 스타일입니다
                        fillColor={isPocheonMouseOver ? "#89a8e5" : "rgba(0,0,0,0.12)"} // 채우기 색깔입니다
                        fillOpacity={isPocheonMouseOver ? 0.8 : 0.7} // 채우기 불투명도입니다
                        onMouseover={() => setPocheonIsMouseOver(true)}
                        onMouseout={() => setPocheonIsMouseOver(false)}
                        onMousedown={(_polygon, mouseEvent) => {
                            console.log(" 클릭이벤트2 " + mouseEvent)
                            setDownCount(downCount + 1)
                        }}
                        zIndex={5}
                    />

                </Map>*/}
                
            </div>

        </div>
    );
}

export default Main;