const data = [
	{
		id: 1,
		title: 'The Lord of the Rings',
		publicationDate: '1954-07-29',
		author: 'J. R. R. Tolkien',
		genres: [
			'fantasy',
			'high-fantasy',
			'adventure',
			'fiction',
			'novels',
			'literature'
		],
		hasMovieAdaptation: true,
		pages: 1216,
		translations: {
			spanish: 'El señor de los anillos',
			chinese: '魔戒',
			french: 'Le Seigneur des anneaux'
		},
		reviews: {
			goodreads: {
				rating: 4.52,
				ratingsCount: 630994,
				reviewsCount: 13417
			},
			librarything: {
				rating: 4.53,
				ratingsCount: 47166,
				reviewsCount: 452
			}
		}
	},
	{
		id: 2,
		title: 'The Cyberiad',
		publicationDate: '1965-01-01',
		author: 'Stanislaw Lem',
		genres: [
			'science fiction',
			'humor',
			'speculative fiction',
			'short stories',
			'fantasy'
		],
		hasMovieAdaptation: false,
		pages: 295,
		translations: {},
		reviews: {
			goodreads: {
				rating: 4.16,
				ratingsCount: 11663,
				reviewsCount: 812
			},
			librarything: {
				rating: 4.13,
				ratingsCount: 2434,
				reviewsCount: 0
			}
		}
	},
	{
		id: 3,
		title: 'Dune',
		publicationDate: '1965-01-01',
		author: 'Frank Herbert',
		genres: ['science fiction', 'novel', 'adventure'],
		hasMovieAdaptation: true,
		pages: 658,
		translations: {
			spanish: ''
		},
		reviews: {
			goodreads: {
				rating: 4.25,
				ratingsCount: 1142893,
				reviewsCount: 49701
			}
		}
	},
	{
		id: 4,
		title: "Harry Potter and the Philosopher's Stone",
		publicationDate: '1997-06-26',
		author: 'J. K. Rowling',
		genres: ['fantasy', 'adventure'],
		hasMovieAdaptation: true,
		pages: 223,
		translations: {
			spanish: 'Harry Potter y la piedra filosofal',
			korean: '해리 포터와 마법사의 돌',
			bengali: 'হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন',
			portuguese: 'Harry Potter e a Pedra Filosofal'
		},
		reviews: {
			goodreads: {
				rating: 4.47,
				ratingsCount: 8910059,
				reviewsCount: 140625
			},
			librarything: {
				rating: 4.29,
				ratingsCount: 120941,
				reviewsCount: 1960
			}
		}
	},
	{
		id: 5,
		title: 'A Game of Thrones',
		publicationDate: '1996-08-01',
		author: 'George R. R. Martin',
		genres: ['fantasy', 'high-fantasy', 'novel', 'fantasy fiction'],
		hasMovieAdaptation: true,
		pages: 835,
		translations: {
			korean: '왕좌의 게임',
			polish: 'Gra o tron',
			portuguese: 'A Guerra dos Tronos',
			spanish: 'Juego de tronos'
		},
		reviews: {
			goodreads: {
				rating: 4.44,
				ratingsCount: 2295233,
				reviewsCount: 59058
			},
			librarything: {
				rating: 4.36,
				ratingsCount: 38358,
				reviewsCount: 1095
			}
		}
	}
];

function getBooks() {
	return data;
}

function getBook(id) {
	return data.find((d) => d.id === id);
}

// Destructuring

// object destructuring
const book = getBook(1);
const { title, author, pages, publicationDate, genres } = book;

// array destructuring, rest operator
const [primaryGenre, secondaryGenre, ...otherGenres] = genres;
console.log(otherGenres);

// spread operator
const newGenres = [...genres, 'epic fantasy'];

const updatedBook = { ...book, moviePublicationDate: '2001-12-19', pages: 1 };

// Arrow functions
const getYear = (str) => str.split('-')[0];

// Template literals
const summary = `${title}, a ${pages}-page long book, was written by ${author} and published in ${getYear(
	publicationDate
)}`;
console.log(summary);

// Ternary Operator
pages > 1000 ? 'Over a 1000' : 'Less than 1000';

// Short-circuiting and Logical Operators

// AND short-circuiting
console.log(true && 'some string');
console.log(false && 'some string');
console.log('Michael' && 'some string');
console.log(0 && 'some string');

// OR short-circuiting
console.log(true || 'some string');
console.log(false || 'some string');

// NULLISH COALESCING
const count = book.reviews.librarything.reviewsCount ?? 'No data';

// Optional Chaining
function getTotalReviewCount(book) {
	const goodreads = book.reviews.goodreads.reviewsCount;
	const librarything = book.reviews.librarything?.reviewsCount ?? 0;
	return goodreads + librarything;
}

console.log(getTotalReviewCount(book));

// Array methods
const books = getBooks();

// The map method
const titles = books.map((book) => book.title);

const essentialData = books.map((book) => ({
	title: book.title,
	author: book.author
}));

// The filter method
const longBooks = books
	.filter((book) => book.pages > 500)
	.filter((book) => book.hasMovieAdaptation);

const adventureBooks = books
	.filter((book) => book.genres.includes('adventure'))
	.map((book) => book.title);

// The reduce method
const pagesAllBooks = books.reduce((acc, book) => acc + book.pages, 0);
pagesAllBooks;

// The sort method
const x = [3, 7, 1, 9, 6];
const ascenSorted = x.slice().sort((a, b) => a - b);
const descSorted = x.slice().sort((a, b) => b - a);

const sortedByPages = books.slice().sort((a, b) => a.pages - b.pages);

// Mutating arrays

// 1. Add book object to array
const newBook = {
	id: 6,
	title: 'Harry Potter and the Chamber of Secrets',
	author: 'J.K. Rowling'
};

const booksAfterAdd = [...books, newBook];

// 2. Delete book object from array
const booksAfterDelete = booksAfterAdd.filter((book) => book.id !== 3);

// 3. Update book object in the array
const booksAfterUpdate = booksAfterDelete.map((book) =>
	book.id === 1 ? { ...book, pages: 1210 } : book
);

booksAfterUpdate;

// Promises
fetch('https://jsonplaceholder.typicode.com/todos')
	.then((res) => res.json())
	.then((data) => console.log(data));

// Async await

const getTodos = async () => {
	const res = await fetch('https://jsonplaceholder.typicode.com/todos');
	const data = await res.json();

	return data;
};

getTodos();
