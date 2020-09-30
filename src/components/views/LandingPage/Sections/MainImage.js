import React from 'react'
import { Typography } from 'antd';
import SearchFeature from '../Sections/SearchFeature'

const { Title } = Typography

function MainImage(props) {
    console.log(props)
    return (
        <div className="splash" style={{ display: 'flex' }}>
            <div style={{ margin: "auto", justifyContent: "center", alignItems: "center" }} >
                <div style={{ textAlign: 'center' }}>
                    <h1 className="heading-text">FilmDB - Explore A Universe of Film</h1>
                    <h2 className="search-text" >Begin Your Search Here</h2>
                    <SearchFeature
                        refreshFunction={props.refreshFunction}
                    />
                </div>
            </div>

        </div>
    )
}

export default MainImage
