import React, { useEffect, useState } from 'react'
import { IMAGE_URL } from '../../../Config';
import { Card } from 'antd'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import NoPicture from './error.svg'


const { Meta } = Card;

function CarouselCast(props) {
    const [Image, setImage] = useState([])
    const [Character, setCharacter] = useState([])
    const [Actor, setActor] = useState([])
    const [UserID, setUserID] = useState([])

    useEffect(() => {
        if (props.detail && props.detail.length > 0) {
            let characters = [];
            let images = [];
            let actors = [];
            let id = [];

            props.detail && props.detail.forEach(item => {
                id.push(item.id)
                images.push(item.profile_path);
                actors.push(item.name);
                characters.push(item.character);
            })
            setUserID(id);
            setCharacter(characters);
            setActor(actors);
            setImage(images);
        }
    }, [props.detail])


    const renderCards = Image.map((cast, index) => {
        return <a href={`/person/${UserID[index]}`} key={index}>
            <Card
                hoverable
                key={index}
                cover={props.detail[index].profile_path ?
                    <img alt="profile" src={`${IMAGE_URL}w500${Image[index]}`} className="card-poster" />
                    : <img alt="profile" src={NoPicture} className="card-poster" />
                }
                style={{
                    borderRadius: "0.25rem",
                    boxShadow: "0 4px 6px 0 hsla(0,0%,0%,0.2)",
                    backgroundColor: "#004A8F",
                    border: "1px solid #004A8F",
                    margin:"auto"
                }}
            >
                <Meta title={Character[index]} description={Actor[index]} />
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

export default CarouselCast
