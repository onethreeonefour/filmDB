import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import CarouselApperances from './Sections/CarouselApperances'
import CarouselDirected from './Sections/CarouselDirected'
import NoPicture from '../MovieDetailPage/Sections/error.svg'
import { Statistic } from 'antd';

function PersonDetailPage(props) {
    const [Detail, setDetail] = useState([])
    const [Directed, setDirected] = useState(null)
    const [Starred, setStarred] = useState(null)

    useEffect(() => {
        const personId = props.match.params.personId;
        fetch(`${API_URL}person/${personId}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                setDetail(response)
            })
        fetch(`${API_URL}person/${personId}/movie_credits?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(response => {

                if (response.cast.length > 0 && response.crew.length > 0) {
                    response.crew.forEach(index => {
                        if (index.job === "Director") {
                            setDirected(true)
                        }
                    })
                    setStarred(true)
                }

                if (response.cast.length > 0 && response.crew.length === 0) {
                    setStarred(true)
                    setDirected(false)
                }
                
                if (response.cast.length === 0 && response.crew.length > 0) {
                    response.crew.map(index => {
                        if (index.job === "Director") {
                            setStarred(false)
                            setDirected(true)
                        }
                    })
                }
            })
    }, [])


    return (
        <div>
            <div className="main-detail" style={{ width: '85%', margin: '1rem auto' }}>
                <div className="actor-detail">
                    {Detail.profile_path ? <img className="portrait" alt="portrait" src={`${IMAGE_URL}w342/${Detail.profile_path}`}></img> :
                        <img className="portrait" alt="portrait" src={NoPicture}></img>
                    }
                    <h3>Personal Information</h3>
                    <Statistic title="Known For" value={Detail.known_for_department} valueStyle={{ fontSize: '1rem' }} />
                    <Statistic title="Gender" value={Detail.gender === 1 ? "Female" : "Male"} valueStyle={{ fontSize: '1rem' }} />
                    <Statistic title="Birthday" value={Detail.birthday} valueStyle={{ fontSize: '1rem' }} />
                    <Statistic title="Place of Birth" value={Detail.place_of_birth} valueStyle={{ fontSize: '1rem' }} />
                </div>
                <div className="biography">
                    <h1>{Detail.name}</h1>
                    <p className="primary-black-text thin">{Detail.biography}</p>
                </div>
                <br />
            </div>
            {/*Carousel for person - If They have directed and starred in films*/}
            {Starred & Directed ?
                <div style={{ width: '80vw', diplay: 'flex', margin: 'auto' }}>
                    <div>
                        <hr />
                        <h2 className="bold">Appears In</h2>
                        <CarouselApperances id={props.match.params.personId} />
                    </div>
                    <div>
                        <hr />
                        <h2 className="bold">Directed</h2>
                        <CarouselDirected id={props.match.params.personId} />
                    </div>
                    {/*Carousel for person - If they've only directed films - else they've only acted in films*/}
                </div> : Directed & Starred === false ?
                    <div style={{ width: '80vw', diplay: 'flex', margin: 'auto' }}>
                        <hr />
                        <h2 className="bold">Directed</h2>
                        <CarouselDirected id={props.match.params.personId} />
                    </div>:                
                    <div style={{ width: '80vw', diplay: 'flex', margin: 'auto' }}>
                        <hr />
                        <h2 className="bold">Appears In</h2>
                        <CarouselApperances id={props.match.params.personId} />
                    </div>

            }

        </div>
    )
}

export default PersonDetailPage
