import React, { useEffect, useState } from 'react'
import { IMAGE_URL } from '../../../Config';
import { Card } from 'antd'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import NoPicture from './data-not-found.svg'


import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const { Meta } = Card;

function CarouselSimilar(props) {

    const [MovieID, setMovieID] = useState([])
    const [Image, setImage] = useState([])
    const [Title, setTitle] = useState([])
    const [Date, setDate] = useState([])
    const [Score, setScore] = useState([])

    useEffect(() => {
        if (props.similar && props.similar.length > 0) {

            let id = [];
            let title = [];
            let images = [];
            let date = [];
            let score = []

            props.similar && props.similar.forEach(item => {
                id.push(item.id);
                images.push(item.poster_path);
                title.push(item.title);
                date.push(item.release_date);
                score.push(item.vote_average)
            })
            setMovieID(id);
            setTitle(title);
            setDate(date);
            setImage(images);
            setScore(score);
        }
    }, [props.similar])

    const handleAvatar = (e) => {
        e.target.src = NoPicture
    }

    const renderCards = Image.map((cast, index) => {
        return <a href={`/movie/${MovieID[index]}`} key={index}>
            <Card
                hoverable
                key={index}
                style={{
                    borderRadius: "0.25rem",
                    boxShadow: "0 4px 6px 0 hsla(0,0%,0%,0.2)",
                    backgroundColor: "#004A8F",
                    border: "1px solid #004A8F",              
                }}
                cover={<img alt="profile" className="card-poster" src={`${IMAGE_URL}w500${Image[index]}`} onError={handleAvatar} />}
            >
                <Meta avatar=
                    {<div className="circular-score" style={{ width: "50px", textAlign: 'center' }}>
                        <CircularProgressbar
                            value={Score[index]}
                            maxValue={10}
                            text={`${Math.round(Score[index] * 10)}%`}
                            background
                            backgroundPadding={6}
                            styles={buildStyles({

                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'butt',
                                // Text size

                                textSize: '16px',
                                // Colors.
                                textColor: Score[index] * 100 / 10 > 65 ? "Chartreuse" : Score[index] * 100 / 10 > 50 ? "orange" : "red",
                                backgroundColor: "#3e98c7",
                                pathColor: Score[index] * 100 / 10 > 65 ? "Chartreuse" : Score[index] * 100 / 10 > 50 ? "orange" : "red",
                                trailColor: '#d6d6d6',
                                backgroundColor: '#333333',
                            })}
                        />
                    </div>}
                    title={Title[index]}
                    description={Date[index]}
                />
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

export default CarouselSimilar
