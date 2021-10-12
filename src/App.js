import './App.css';
import styled from 'styled-components'
import MovieComponent from './Components/MovieComponent';
import { useState } from 'react';
import axios from 'axios';
import MovieinfoComponent from './Components/MovieinfoComponent';

export const API_KEY = "2f8a38a4";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(https://assets.nflxext.com/ffe/siteui/vlv3/9b3267c9-5086-4550-92f1-eddc22a1f78e/8b897a27-47f0-42d0-bb50-10fdb72d34a2/IN-en-20211004-popsignuptwoweeks-perspective_alpha_website_large.jpg);
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  align-item: center;
`;
  
const AppName = styled.div`   
display:flex;
flex-direction:row;
align-items:center;
`;

const MovieImage = styled.img`
  width:45px;
  height:45px;
  margin: 10px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;

const SearchImg = styled.img`
  width:32px;
  height:32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  width: 80%;
  border-radius: 5px;
  margin-left: 15px;
  background-color: #fafaf6;
`;

const MovieListContainer = styled.div`
 display:flex;
 flex-direction:row;
 flex-wrap:wrap;
 padding:30px;
 gap:24px;
 justify-content:space-evenly; 
`;

const Placeholder = styled.img`
  width: 170px;
  height: 200px;
  margin: 150px;
  opacity: 80%;

`;

function App() {

  const [searchQuery,updateSearchQuery] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const [movieList,updateMovieList] = useState([]);

  const[selectedMovie, onMovieSelect] = useState();

  const fetchData = async(searchString) => {
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    updateMovieList(response.data.Search)
  }

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() =>fetchData( event.target.value),500);
    updateTimeoutId(timeout) 
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/movie-icon.png" />
          Movie App
        </AppName>
        <SearchBox>
          <SearchImg src="/search-icon.png" />
          <SearchInput placeholder="Search Movies🎭" value={searchQuery} onChange={onTextChange} />
        </SearchBox>
      </Header>
      {selectedMovie && (
        <MovieinfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="https://i2.wp.com/boingboing.net/wp-content/uploads/2015/10/pJReN4H1.gif?w=970" />
          
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
