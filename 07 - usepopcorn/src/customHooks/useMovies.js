import { useState, useEffect } from 'react';

const API_KEY = 'e9b96d23';
export function useMovies(query, callback) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(
		function () {
			callback?.();
			const controller = new AbortController();
			async function fetchMovies() {
				try {
					setIsLoading(true);
					setError('');

					const response = await fetch(
						`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
						{ signal: controller.signal }
					);

					if (!response.ok)
						throw new Error('Something went wrong with fetching movies');

					const data = await response.json();

					if (data.Response === 'False') throw new Error('Movie not found');

					setMovies(data.Search);
					setError('');
				} catch (error) {
					if (error.name !== 'AbortError') {
						console.log(error.message);
						setError(error.message);
					}
				} finally {
					setIsLoading(false);
				}
			}
			if (query.length < 3) {
				setMovies([]);
				setError('');
				return;
			}

			fetchMovies();

			return function () {
				controller.abort();
			};
		},
		[query]
	);

	return { movies, isLoading, error };
}
