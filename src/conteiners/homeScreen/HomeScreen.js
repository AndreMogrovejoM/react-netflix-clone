import React from 'react';
import requests from '../../backend/Requests';
import Banner from '../../components/banner/Banner';
import Navbar from '../../components/navbar/Navbar';
import Row from '../../components/row/Row';
import './HomeScreen.css';




export default function HomeScreen() {
    return (
        <div className="homeScreen">
            {/* Nav */}
            <Navbar />

            {/* Banner */}
            <Banner />

            {/* Row */}
            <Row 
                title= 'NETFLIX ORIGINALS'
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow={true}
            />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />

            
        </div>
    )
}
