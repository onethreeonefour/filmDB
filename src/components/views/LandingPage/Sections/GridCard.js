import React from 'react'
import { Col, Card } from 'antd';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import NoPicture from '../../MovieDetailPage/Sections/blank-poster.svg';

const { Meta } = Card;



function GridCard(props) {
    const userAverage = Math.round(props.average * 10) / 100;

    //console.log(props)
    return (
        <Col lg={6} md={8} xs={24} className="custom-row">
            <a href={`/movie/${props.movieId}`}>
                <Card
                   
                    className="card"
                    hoverable
                    style={{
                        borderRadius: "1rem",
                        boxShadow: "0 4px 6px 0 hsla(0,0%,0%,0.2)"
                    }}
                    cover={props.image ? <img alt="movie" style={{ borderRadius: "1rem" }}
                        src={props.image} /> : <img src={NoPicture} alt="movie"></img>
                    }
                >
                    <Meta
                        avatar=
                        {<div style={{ width: "75px", textAlign: 'center' }}>
                            <CircularProgressbar
                                value={userAverage}
                                maxValue={1}
                                text={`${Math.round(userAverage * 100)}%`}
                                background
                                backgroundPadding={6}

                                styles={buildStyles({

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',
                                    // Text size

                                    textSize: '16px',
                                    // Colors.
                                    textColor: props.average * 100 / 10 > 65 ? "Chartreuse" : props.average * 100 / 10 > 50 ? "orange" : "red",
                                    backgroundColor: "#3e98c7",
                                    pathColor: props.average * 100 / 10 > 65 ? "Chartreuse" : props.average * 100 / 10 > 50 ? "orange" : "red",
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#333333',
                                })}
                            />
                        </div>}
                        title={props.title}
                        description={props.date}
                    />
                </Card>
            </a>
        </Col >
    )

}

export default GridCard
