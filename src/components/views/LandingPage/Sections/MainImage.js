import React from 'react'
import SearchFeature from '../Sections/SearchFeature'

function MainImage(props) {
    console.log(props)
    return (
        <div className="splash" style={{ display: 'flex' }}>
            <div style={{ margin: "auto", justifyContent: "center", alignItems: "center" }} >
                <div style={{ textAlign: 'center' }}>
                    <h1 className="heading-text">FilmDB</h1>
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
