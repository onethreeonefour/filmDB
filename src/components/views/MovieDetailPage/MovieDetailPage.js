import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import DetailImage from './Sections/DetailImage';
import { Statistic } from 'antd';
import CarouselCast from './Sections/CarouselCast';
import CarouselSimilar from './Sections/CarouselSimilar';


function MovieDetailPage(props) {
    const [Movie, setMovie] = useState([])
    const [Cast, setCast] = useState([])
    const [Crew, setCrew] = useState([])
    const [Similar, setSimilar] = useState([])

    useEffect(() => {
        const movieId = props.match.params.movieId;
      
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                setMovie(response);
                fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(response => {
                        setCrew(response.crew)
                        setCast(response.cast)
                    })

                fetch(`${API_URL}movie/${movieId}/similar?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(response => {
                        setSimilar(response.results)
                    })

            })
    }, [])

    const userAverage = Math.round(Movie.vote_average * 10) / 100;

    return (
        <div style={{ width: "100%", margin: 0 }}>
            {/*Main Splash Image*/}
            {Movie &&
                <DetailImage
                    image={`${IMAGE_URL}original${Movie.backdrop_path && Movie.backdrop_path}`}
                    crew={Crew}
                    title={Movie.title}
                    text={Movie.overview}
                    poster={`${IMAGE_URL}w342${Movie.poster_path && Movie.poster_path}`}
                    score={userAverage}
                    movieId={props.match.params.movieId}
                    genre={Movie.genres}
                    date={Movie.release_date}
                    runtime={Movie.runtime}
                />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2>Movie Info</h2>
                {/*Movie Info Table - To Be Changed*/}
                <div className="movie-info" >
                    <Statistic title="Status" value={Movie.status} valueStyle={{ fontSize: '1rem'}} />
                    <Statistic title="Budget" value={Movie.budget} valueStyle={{ fontSize: '1rem' }} />
                    <Statistic title="Revenue" value={Movie.revenue} valueStyle={{ fontSize: '1rem' }} />
                    <Statistic title="Vote Count" value={Movie.vote_count} valueStyle={{ fontSize: '1rem' }} />
                    <Statistic title="Language" value={Movie.original_language} valueStyle={{ fontSize: '1rem' }} />
                    <Statistic title="Original Title" value={Movie.original_title} valueStyle={{ fontSize: '1rem' }} />
                </div>
                <br />
                <hr />
                <br />
                <h2>Top Billed Cast</h2>
                <br />
                {/*Carousel Cast*/}
                <CarouselCast detail={Cast} />
                <br />
                <hr />
                <br />
                <h2>More Like This</h2>
                <br />
                {/*Carousel Similar Movies*/}
                <CarouselSimilar similar={Similar} />
            </div>
        </div>
    )
}

export default MovieDetailPage
