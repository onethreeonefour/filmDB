import React from 'react'
import SearchFeature from '../Sections/SearchFeature'

function MainImage(props) {
    return (
        <div className="splash" style={{ display: 'flex' }}>
            <div className="scroll-arrow">
                <a href="#projects"><span></span></a>
            </div>
            <div class="stars"></div>
            <div class="twinkling"></div>
            <div style={{ margin: "auto", justifyContent: "center", alignItems: "center", zIndex: "5" }} >
                <div style={{ textAlign: 'center' }}>
                    <h1 className="heading-text">FILMDB</h1>
                    <h2 className="search-text">Explore A Universe of Film</h2>
                    <SearchFeature
                        refreshFunction={props.refreshFunction}
                    />
                </div>
            </div>

        </div>
    )
}

export default MainImage
