import { useHits } from "react-instantsearch";

type MovieType = {
  objectID: string;
  title: string;
  overview: string;
  image: string;
};

const MovieHits = () => {
  const { results } = useHits();
  const movies = results?.hits as unknown as MovieType[];

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        gap: "10px",
        borderRadius: "10px",
        flexWrap: "wrap",
        color: "black",
      }}
    >
      {movies &&
        movies.length > 0 &&
        movies.map((movie) => (
          <div
            style={{
              width: "300px",
              backgroundColor: "whitesmoke",
              borderRadius: "10px",
              padding: "10px",
            }}
            key={movie.objectID}
          >
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
    </div>
  );
};

export default MovieHits;
