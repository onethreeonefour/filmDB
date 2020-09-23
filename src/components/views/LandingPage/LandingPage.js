import React from 'react'
import { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import MainImage from './Sections/MainImage';
import GridCard from './Sections/GridCard';
import SearchFeature from './Sections/SearchFeature'


import { Row, Button } from 'antd';

function LandingPage() {
    const [Movies, setMovies] = useState([]);
    const [CurrentPage, setCurrentPage] = useState(0);
    const [Searching, setSearching] = useState(false);
    const [Query, setQuery] = useState("");
    const [CurrentSearchPage, setCurrentSearchPage] = useState(0)
    
    useEffect(() => {
        const endpoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)

    }, [])

    const fetchMovies = (path) => {
        fetch(path)
            .then(response => response.json())
            .then(response => {
                setMovies([...Movies, ...response.results]);
                setCurrentPage(response.page)
            })
    }

    const fetchSearchedMovies = (path) => {
        fetch(path)
            .then(response => response.json())
            .then(response => {
                //console.log(response);
                setMovies(response.results);
                setCurrentPage(response.page)
            })
    }

    const handleClick = () => {
        let endpoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`
        fetchMovies(endpoint);
    }

    const fetchSearch = (query) => {
        let searchQuery = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${CurrentSearchPage + 1}&include_adult=false`
        setSearching(true);
        setQuery(query);
        fetchSearchedMovies(searchQuery);
        setCurrentSearchPage(CurrentSearchPage + 1)
    }

    const continueSearch = () => {

        setCurrentSearchPage(CurrentSearchPage + 1)
        let searchQuery = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${Query}&page=${CurrentSearchPage + 1}&include_adult=false`
        fetchSearchedMovies(searchQuery);
    }
 
    return (
        <div style={{ width: "100%", margin: 0 }}>
            {/*Main Splash Image*/}
            {Movies[0] &&
                <MainImage
                    image={`${IMAGE_URL}original${Movies[0].backdrop_path && Movies[0].backdrop_path}`}
                    title={Movies[0].original_title}
                    text={Movies[0].overview}
                />
            }

            {/*Body*/}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                {Searching ? <div><h1 className="large-black-heading" style={{ textAlign: 'center' }}>Begin Your Search Here</h1>
                    {/*Search Feature*/}
                    <SearchFeature
                        refreshFunction={fetchSearch}
                    />
                    <br />
                    <h2>Search Query</h2>
                    <hr />
                    <br />
                    {/*Grid*/}
                    <Row gutter={[16, 16]}>
                        {Movies && Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCard
                                    image={movie.poster_path && `${IMAGE_URL}w780${movie.poster_path}`}
                                    movieId={movie.id}
                                    title={movie.title}
                                    average={movie.vote_average}
                                    date={movie.release_date}
                                    genres={movie.genre_ids}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                    {/*Load More Button*/}
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={continueSearch} >Continue Search</Button>
                    </div>
                </div> :
                    <div>{/*Trending Popular Movies & NOT Searching*/}
                        <h1 className="large-black-heading" style={{ textAlign: 'center' }}>Begin Your Search Here</h1>
                        {/*Search Feature*/}
                        <SearchFeature
                            refreshFunction={fetchSearch}
                        />
                        <br />
                        <h2>Trending Movies</h2>
                        <hr />
                        <br />
                        {/*Grid*/}
                        <Row gutter={[16, 16]}>
                            {Movies && Movies.map((movie, index) => (
                                <React.Fragment key={index}>
                                    <GridCard
                                        image={movie.poster_path && `${IMAGE_URL}w780${movie.poster_path}`}
                                        movieId={movie.id}
                                        title={movie.title}
                                        average={movie.vote_average}
                                        date={movie.release_date}
                                        genres={movie.genre_ids}
                                    />
                                </React.Fragment>
                            ))}
                        </Row>
                        {/*Load More Button*/}
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={handleClick}>Load More</Button>
                        </div>
                    </div>}

            </div>
        </div>
    )
}

export default LandingPage
