import React from 'react'
import { API_URL, API_KEY } from '../../../Config';
import { useEffect, useState } from "react";
import { Typography, Tag } from 'antd';
import '../../../../index.css';
import NoPicture from './data-not-found.svg'


import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const { Title } = Typography;

function DetailImage(props) {
    const [Score, setScore] = useState(0)
    const [Director, setDirector] = useState([])
    const [Keywords, setKeywords] = useState([])
    const [Genre, setGenre] = useState([])

    useEffect(() => {
        const movieId = props.movieId;

        fetch(`${API_URL}movie/${movieId}/keywords?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(response => {

                setKeywords(response.keywords)
            })

        if (props.score) {
            setScore(props.score)
        }
        if (props.crew && props.crew.length > 0) {

            for (let i in props.crew) {
                if (props.crew[i].job === "Director") {
                    setDirector(...Director, props.crew[i])
                }

            }
        }

        if (props.genre && props.genre.length > 0) {
            setGenre(props.genre);
        }
    }, [props.score, props.crew, props.genre])


    const renderTags = Keywords.map((cast, index) => {
        return <Tag key={index} style={{ margin: "0.25rem" }}>
            {Keywords[index].name}
        </Tag>
    })

    const renderGenre = Genre.map((cast, index) => {
        return <span key={index} style={{ margin: "0.25rem" }}>
            {Genre[index].name}
        </span>
    })

    const handleAvatar = (e) => {
        e.target.src = NoPicture
    }


    return (
        <div className="detail-image" style={{
            backgroundColor: "black",
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.70)
            39%, rgba(0,0,0,0.70)
            60%, rgba(0,0,0,0.99)
            100%),url('${props.image}')`,
            backgroundRepeat: 'no-repeat',
            padding:'3rem 0 3rem 0',
            backgroundSize: '100%, cover',
            backgroundPosition: 'center,center',
            width: '100%',
            position: 'relative',
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <div className="main-detail">
                <div className="main-row">
                    <img className="poster" src={props.poster} alt="poster" onError={handleAvatar}></img>
                </div>
                <div style={{ padding: '1rem', color: 'white' }}>
                    <Title style={{ color: 'white' }} level={1}>{props.title}</Title>
                    <p>{props.date} &#8226; {renderGenre} &#8226; {props.runtime} Minutes</p>
                    <h2 style={{ color: 'white' }}>Overview</h2>
                    <p style={{ fontSize: '1rem' }}>{props.text}</p>
                    {/*User Weighted Average*/}
                    <div style={{ width: "125px", display: "flex", textAlign: 'center', paddingBottom:'0.5rem' }}>
                        <CircularProgressbar
                            value={Score}
                            maxValue={1}
                            text={`${Math.round(Score * 100)}%`}
                            background
                            backgroundPadding={6}
                            style={{ textAlign: 'center' }}
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)

                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'butt',
                                fontWeight: 'bolder',
                                // Text size
                                textSize: '1.25rem',
                                // Colors.
                                textColor: Score * 100 > 65 ? "Chartreuse" : Score * 100 > 50 ? "orange" : "red",
                                pathColor: Score * 100 > 65 ? "Chartreuse" : Score * 100 > 50 ? "orange" : "red",
                                trailColor: '#d6d6d6',
                                backgroundColor: '#444444',
                            })}
                        />
                        <p style={{ fontSize: '1rem', textAlign: 'center', paddingTop: '1rem', fontWeight: 'bolder' }}>User Score</p>
                    </div>
                    <a href={`/person/${Director.id}`}><p >Director: <span style={{ fontWeight: 'bolder' }}> {Director.name}</span></p></a>
                    <p>Keywords</p>
                    {renderTags}
                </div>

            </div>
        </div>
    )
}

export default DetailImage
