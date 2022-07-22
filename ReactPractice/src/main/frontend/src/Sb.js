// 사이드바 전체를 감싸는 js

import React from "react"
import SbItem from './SbItem'

// JSX 형식
const Sb = ({ items }) => {
    return (
        <div>
            {items.map((subItem, index) =>
                <SbItem item={subItem} key={index} />
            )}
        </div>
    )
}

export default Sb;