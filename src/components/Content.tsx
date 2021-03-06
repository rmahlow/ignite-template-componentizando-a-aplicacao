import { useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";


interface GenreResponseProps {
  Genre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content(props: GenreResponseProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);  

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.Genre.id}`).then(response => {
      setMovies(response.data);
      console.log(movies);
    });       
    console.log('1234')
  }, [props]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {props.Genre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}