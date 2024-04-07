/* eslint-disable no-undef */
import dotEnv from "dotenv";
dotEnv.config();
import Typesense from "typesense";
import movies from "../data/movies.json" with {type : "json"}

export default (async () => {
  const TYPESENSE_CONFIG = {
    nodes: [
      {
        host: process.env.TYPESENSE_HOST,
        port: process.env.TYPESENSE_PORT,
        protocol: process.env.TYPESENSE_PROTOCOL,
      },
    ],
    apiKey: process.env.TYPESENSE_ADMIN_API_KEY,
  };

  const typesense = new Typesense.Client(TYPESENSE_CONFIG);

  // typesense shcema
  const schema = {
    name: "movies",
    num_documents: 0,
    default_sorting_field: "popularity",
    fields: [
      {
        name: "title",
        type: "string",
        facet: false,
      },
      {
        name: "overview",
        type: "string",
        facet: false,
      },
      {
        name: "genres",
        type: "string[]",
        facet: true,
      },
      {
        name: "genres.level0",
        type: "string[]",
        facet: true,
      },
      {
        name: "genres.level1",
        type: "string[]",
        facet: true,
        optional: true,
      },
      {
        name: "genres.level2",
        type: "string[]",
        facet: true,
        optional: true,
      },
      {
        name: "release_date",
        type: "string",
        facet: true,
      },
      {
        name: "popularity",

        type: "float",
        facet: true,
      },
      {
        name: "vote_average",
        type: "float",
        facet: true,
      },
      {
        name: "image",
        type: "string",
        facet: true,
      },
    ],
  };

  // //   Import
  const movies_count= movies.length;

  try{
    const collection= await typesense.collections("movies").retrieve() 
    // delete the movies from the typesense if the collection length does not match with the movies 
    if(collection.num_documents !== movies_count){
        await typesense.collections("movies").delete()
        console.log("[movie deleting]",collection.num_documents)
    }

  }catch(err){
    console.log("[error]",err.message)
  }


//   Create a typesense collection
await typesense.collections().create(schema)
console.log("[typesense collection created")

const movieList= getMovies()

// Add documents to the typesense collection
try{
    const response= await typesense.collections('movies').documents().import(movieList)

    console.log("[response]",response)
}catch(err){
    console.log("[typesense collection error]", err.message)
}
 
})();

const getMovies=()=>{
    movies.forEach(movie=>{
        movie.image=`https://image.tmdb.org/t/p/w300${movie.poster_path}`;
            delete movie.poster_path;
            delete movie.original_language;
            delete movie.original_title;
            delete movie.video;
            delete movie.backdrop_path;
            delete movie.vote_count;
            delete movie.id;
            delete movie.adult;
            delete movie.genre_ids;

    movie.genres.forEach((genre,index)=>{
    // [science fiction], [science fiction > action], [science fiction > action > drama]
        movie[`genres.level${index}`]= [movie.genres.slice(0,index+1).join(">")]
    })

    })

return movies
}