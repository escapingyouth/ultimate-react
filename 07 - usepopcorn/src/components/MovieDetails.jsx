import { useState, useEffect, useRef } from 'react';
import { useKey } from '../customHooks/useKey';

import Loader from './Loader';
import StarRating from './StarRating';

const API_KEY = 'e9b96d23';

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState('');

	const countRef = useRef(0);

	useEffect(
		function () {
			if (userRating) countRef.current += 1;
		},
		[userRating]
	);

	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId
	)?.userRating;

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre
	} = movie;

	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split('').at(0)),
			userRating
		};
		onAddWatched(newWatchedMovie);
		onCloseMovie();
	}
	useKey('Escape', onCloseMovie);
	useEffect(
		function () {
			async function getMovieDetails() {
				setIsLoading(true);
				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
				);

				const data = await response.json();
				setMovie(data);
				setIsLoading(false);
			}
			getMovieDetails();
		},
		[selectedId]
	);

	useEffect(
		function () {
			if (!title) return;
			document.title = `Movie | ${title}`;

			return function () {
				document.title = 'usePopcorn';
			};
		},
		[title]
	);
	return (
		<div className='details'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className='btn-back' onClick={onCloseMovie}>
							&larr;
						</button>

						<img src={poster} alt={`Poster of  ${movie} movie`} />
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐</span>
								{imdbRating} IMDB rating
							</p>
						</div>
					</header>

					<section>
						<div className='rating'>
							{!isWatched ? (
								<>
									<StarRating
										maxRating={10}
										size={24}
										onSetRating={setUserRating}
									/>
									{userRating > 0 && (
										<button className='btn-add' onClick={handleAdd}>
											+ Add to list
										</button>
									)}
								</>
							) : (
								<p>You have rated this movie ⭐{watchedUserRating}</p>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors} </p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	);
}
export default MovieDetails;
