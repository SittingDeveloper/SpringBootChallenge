import React, {useEffect, useState} from 'react';
import './Sidebar.css';
import '../SearchPlace/LandingPage';
import MapContainer from "../SearchPlace/MapContainer";
import axios from "axios";

function Sidebar() {

    const [subTitle, setSubtitle] = useState([]);
    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState("경기도")
    const [isOpen, setMenu] = useState(false); // subMenu, default false

    // Sub-Section 개별 실행 state
    const [flagNumber,setFlagNumber] = useState(0);

    const toggleMenu = (checked_id) => {

        setMenu(() => false)

        console.log("checked_id : " + checked_id)
        setFlagNumber(checked_id);

        setMenu(isOpen => !isOpen); // on,off Boolean 개념

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

                        <ul className="collapse list-unstyled" id="infraSubmenu" >
                            <li><a href="#">학원교습소현황</a></li>
                            <li><a href="#">평생교육기관현황</a></li>
                            <li>
                                <a href="#" onClick={() => toggleMenu("1")}>
                                    대학현황
                                </a>
                                <div className={ (flagNumber=="1" && isOpen) ? "show-menu" : "hide-menu"}>
                                    <h4>
                                        대학현황
                                    </h4>
                                </div>
                            </li>
                            <li>
                                <a href="#" onClick={() => toggleMenu("2")}>
                                    공공도서관현황
                                </a>
                                <div className={ (flagNumber=="2" && isOpen) ? "show-menu" : "hide-menu"}>
                                    <h4>
                                        공공도서관현황
                                    </h4>
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