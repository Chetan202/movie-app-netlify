import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 3 px 10px 0 #aaa;
  cursor: pointer;
  margin-top: 15px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const CoverImage = styled.img`
object-fit:cover;
width:200px;
height:240px;
`;

const MovieName = styled.span`
  font-size: 18px;
  font-weight: 1000;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: ellipsis;
`;

const InfoColumn = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
`;

const MovieInfo = styled.span`
    font-size:16px;
    font-weight:1000;
    color:black;
    text-transform:capitalize;
`;

const MovieComponent = (props) =>{
    const {Title,Year,imdbID,Type,Poster} = props.movie;

    return (
      <MovieContainer onClick={() => {
          props.onMovieSelect(imdbID)
      }}>
        <CoverImage src={Poster} />
        <MovieName>{Title}</MovieName>
        <InfoColumn>
            <MovieInfo>Year : {Year}</MovieInfo>
            <MovieInfo>Type : {Type}</MovieInfo>
        </InfoColumn>
      </MovieContainer>
    );
};

export default MovieComponent 