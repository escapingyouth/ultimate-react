import { useRef } from 'react';
import { useKey } from '../customHooks/useKey';

function Search({ query, setQuery }) {
	const inputEl = useRef(null);

	// useEffect(function () {
	// 	const el = document.querySelector('.search');

	// 	el.focus();
	// }); // bad way to select dom elements

	useKey('Enter', function () {
		if (document.activeElement === inputEl.current) return;
		inputEl.current.focus();
		setQuery('');
	});

	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			ref={inputEl}
			onChange={(e) => setQuery(e.target.value)}
		/>
	);
}

export default Search;
