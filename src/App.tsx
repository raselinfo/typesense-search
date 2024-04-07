import { InstantSearch, Pagination, RefinementList, SearchBox } from "react-instantsearch";
import "./App.css";
import { searchClient } from "./typesenseAdapter";
import MovieHits from "./components/Movies";

function App() {
  return (
    <section style={{
      color: "white"
    }}>
      <InstantSearch indexName="movies" searchClient={searchClient}>
        <h1>Search your movies</h1>
        <SearchBox />
        <RefinementList attribute="genres" />
        <MovieHits />
        <Pagination />
      </InstantSearch>
    </section>
  );
}

export default App;
