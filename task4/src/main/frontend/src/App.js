import React from 'react'
import {Sidebar, InputItem, DropdownItem, Icon, Item, Logo, LogoText} from 'react-sidebar-ui'
import 'react-sidebar-ui/dist/index.css';
import {IoIosSchool, IoIosPin, IoIosBusiness} from "react-icons/io";

const App = () => {
  return (
      <div>
        <Sidebar bgColor='black' isCollapsed={false}>
          <Logo
              image='img/logo.png'
              imageName='react logo'/>
          <LogoText>
            <h5>지역자원 정보시스템</h5>
          </LogoText>

          <DropdownItem
              values={['지역 재정', '지역 경제', '지역 인구', '인구변화 추이', '지역 복지']}
              bgColor={'black'}>
            <Icon><i className="fas fa-home"/></Icon>
            <IoIosSchool size="18"></IoIosSchool>
            &nbsp; 학교자료
          </DropdownItem>

          <DropdownItem
              values={['학원교습소현황', '평생교육기관현황', '대학현황', '공공도서관현황' +
              '지역아동센터현황','체육시설현황','향토문화유적현황','문화시설현황','학교폭력현황','대문화학생현황']}
              bgColor={'black'}>
            <Icon><i className="fas fa-info"/></Icon>
            <IoIosPin size="18"></IoIosPin>
            &nbsp; 지역일반
          </DropdownItem>

          <Item bgColor='black'>
            <Icon><i className="fas fa-sitemap"/></Icon>
            <IoIosBusiness size="18"></IoIosBusiness>
            &nbsp; 지역인프라
          </Item>

          <InputItem type='text' placeholder={'Search...'}/>

        </Sidebar>
      </div>
  )
};

export default App;