import { useState } from 'react';

const Form = ({ onAddItems }) => {
	const [description, setDescription] = useState('');
	const [quantity, setQuantity] = useState(5);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!description) return;

		const newItem = { description, quantity, packed: false, id: Date.now() };

		onAddItems(newItem);
		setDescription('');
		setQuantity(1);
	};
	return (
		<form className='add-form' onSubmit={handleSubmit}>
			<h3>What do you need for your 😍 trip?</h3>
			<select
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}
			>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>

			<input
				type='text'
				placeholder='item...'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button type='submit'>Add</button>
		</form>
	);
};

export default Form;
