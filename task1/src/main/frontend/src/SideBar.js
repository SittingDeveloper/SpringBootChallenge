import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation } from 'react-minimal-side-navigation';

import { Icon } from 'semantic-ui-react';

const Bar = styled.div`
  position: sticky;
  top: 200px;
  width: 10.5rem;
  height: 100%;
  /* position: fixed;
  left: 19rem;
  top: 12rem;
  transform: translate(1em, 12rem); 
`;

const SideBar = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.authentication);

    const setArr = [];

    useEffect(() => {
        // 배열로 받은 태그목록을 배열 내 각각의 object로 변환한 뒤 아래 subNav에 전달
        if (user) {
            (user.user.tags || []).forEach((tag) => {
                const curObj = {};
                curObj.title = tag;
                curObj.itemId = `/tags/${tag}`;
                setArr.push(curObj);
            });
        }
    }, []);

    return (
        <>
            <Bar>
                <Navigation
                    items={[
                        {
                            title: '피드',
                            itemId: { item: 'main', title: '피드' },
                            elemBefore: () => <Icon name="th large" style={{ fontSize: '1.2rem' }} />,
                        },

                        // {
                        //   title: '팔로우',
                        //   itemId: { item: 'follow', title: '팔로우' },
                        //   elemBefore: () => <Icon name="user plus" style={{ fontSize: '1.2rem' }} />,
                        // },
                        {
                            title: '관심태그',
                            itemId: '/tags',
                            elemBefore: () => <Icon name="tags" style={{ fontSize: '1.2rem' }} />,

                            subNav: user ? setArr : null,
                        },
                        {
                            title: '북마크',
                            itemId: { item: 'bookmark', title: '북마크' },
                            elemBefore: () => <Icon name="bookmark" style={{ fontSize: '1.2rem' }} />,
                        },
                        {
                            title: '읽은 목록',
                            itemId: { item: 'study', title: '읽은 목록' },
                            elemBefore: () => <Icon name="eye" style={{ fontSize: '1.2rem' }} />,
                        },
                    ]}
                />
            </Bar>
        </>
    );
};

export default SideBar;