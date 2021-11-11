import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import {API_KEY} from "../App";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 80px;
  border-bottom: 1px solid lightgray;
  justify-content: center;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const InfoColumn = styled.div`
display:flex;
flex-direction:column;
margin-left:10px;
justify-content:space-between;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 352px;
`;

const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: white;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size:16px;
  font-weight:800;
  color:white;
  overflow:hidden;
  margin:4px 0;
  text-transform:capitalize;
  text-overflow:ellipsis;
  &span{
    opacity:.5;
  }
`;

const Close = styled.span`
  font-size: 16px;
  font-weight: 1000;
  color: white;
  overflow: hidden;
  background:lightgray;
  height:fit-content;
  padding:8px;
  border-radius:50%;
  cursor:pointer;
  opacity:.8;
`; 

const Placeholder = styled.img`
  width:120px;
  height:120px;
  margin:150px;
  opacity:50%;
`;

const MovieinfoComponent = (props) => {
  const [movieInfo,setMovieInfo] = useState();
  const {selectedMovie} = props;

  useEffect(() => {
    axios.get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`).then((response) =>{setMovieInfo((response.data))});
  },[selectedMovie]); 
  return (
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo?.Poster} />
          <InfoColumn>
            <MovieName>
              {movieInfo?.Type} : {movieInfo?.Title}
            </MovieName>
            <MovieInfo>
              Imdb Rating : <span>{movieInfo?.imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
              Language : <span>{movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
              Rated : <span>{movieInfo?.Rated}</span>
            </MovieInfo>
            <MovieInfo>
              Released : <span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
              Runtime : <span>{movieInfo?.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
              Genre : <span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              Director : <span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
              Actor : <span>{movieInfo?.Actors}</span>
            </MovieInfo>
            <MovieInfo>
              Plot : <span>{movieInfo?.Plot}</span>
            </MovieInfo>
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}>X</Close>
        </>
      ) : (
        <Placeholder  src="https://i2.wp.com/boingboing.net/wp-content/uploads/2015/10/pJReN4H1.gif?w=970"/>
      )}
    </Container>
  );
};

export default MovieinfoComponent;
