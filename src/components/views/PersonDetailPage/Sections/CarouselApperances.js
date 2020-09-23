import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../../Config';
import { Card } from 'antd'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import NoPicture from '../../MovieDetailPage/Sections/blank-poster.svg'

const { Meta } = Card;

function CarouselApperances(props) {

    const [Movie, setMovie] = useState([])
    
    useEffect(() => {
        let personId = props.id
        
        fetch(`${API_URL}person/${personId}/movie_credits?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(response => {
                setMovie(response.cast)
            })
   
    }, [])

    const handleAvatar = (e) => {
        e.target.src = NoPicture
    }


    const renderCards = Movie.map((cast, index) => {
        return <a key={index} href={`/movie/${Movie[index].id}`}>
            <Card
                hoverable
                key={index}
                cover={Movie[index].poster_path ?
                    <img alt="profile" className="card-poster" style={{ borderRadius: "1rem" }} onError={handleAvatar} src={`${IMAGE_URL}w500${Movie[index].poster_path}`} />
                    : <img alt="profile" className="card-poster" style={{ borderRadius: "1rem" }} onError={handleAvatar} src={NoPicture} />}
            >
                <Meta title={Movie[index].title} description={Movie[index].release_date ? (new Date(Movie[index].release_date).getFullYear()) : "TBD"} />
            </Card>
            
        </a>
    })
    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={true}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024
                    },
                    items: 5,
                    partialVisibilityGutter: 40
                },
                mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464
                    },
                    items: 2,
                    partialVisibilityGutter: 30
                }
            }}
            showDots={false}
            sliderClass=""
            slidesToSlide={2}
            swipeable
        >
            {renderCards}
        </Carousel>
    )
}

export default CarouselApperances