import Movie from './Movie';

function MovieList({ movies, onSelectMovie }) {
	return (
		<ul className='list list-movies'>
			{movies?.map((movie) => (
				<Movie movie={movie} onSelectMovie={onSelectMovie} key={movie.imdbID} />
			))}
		</ul>
	);
}

export default MovieList;
