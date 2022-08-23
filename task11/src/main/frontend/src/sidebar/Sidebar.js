import React, {useEffect, useState} from 'react';
import './Sidebar.css';
import '../SearchPlace/LandingPage';
import MapContainer from "../SearchPlace/MapContainer";
import axios from "axios";
import Select from "react-select";

function Sidebar() {

    const [subTitle, setSubtitle] = useState([]);
    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState("경기도")
    const [isOpen, setMenu] = useState(false); // subMenu, default false

    // Sub-Section 개별 실행 state
    const [flagNumber, setFlagNumber] = useState(0);

    const toggleMenu = (checked_id) => {

        console.log("sessionStorage : " + sessionStorage.toggle);

        if (sessionStorage.toggle == checked_id) {
            sessionStorage.toggle = checked_id;
            setMenu(isOpen => !isOpen);
        }

        else {
            setMenu(() => false);
            console.log("checked_id : " + checked_id)
            setFlagNumber(checked_id);
            sessionStorage.toggle = checked_id;
            setMenu(isOpen => !isOpen); // on,off Boolean 개념
        }

    };

    const hideMenu = () => {
        setMenu(() => false)
    }

    const onChange = (e) => {
        setInputText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPlace(InputText)
        console.log("sidebar : " + InputText)
        setInputText('')
    }

    const bySeries = [
        { label : "인문계열", value : 1},
        { label : "사회계열", value : 2},
        { label : "교육계열", value : 3},
        { label : "공학계열", value : 4},
        { label : "자연계열", value : 5},
        { label : "의약계열", value : 6},
        { label : "예체능계열", value : 7},
    ];

    useEffect(() => {
        axios.get('/api/page')
            .then(response => setSubtitle(response.data))
            .catch(error => console.log(error));
    }, []);

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
                                            {/*<select>
                                                <option value={"humanities"}>인문계열</option>
                                                <option value={"society"}>사회계열</option>
                                                <option value={"education"}>교육계열</option>
                                                <option value={"engineering"}>공학계열</option>
                                                <option value={"nature"}>자연계열</option>
                                                <option value={"medication"}>의약계열</option>
                                                <option value={"artMusicPhysical"}>예체능계열</option>
                                            </select>*/}
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

            <MapContainer searchPlace={Place}/>

        </div>
    );
}

export default Sidebar;