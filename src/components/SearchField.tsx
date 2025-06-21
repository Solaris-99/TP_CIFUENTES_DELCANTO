import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

interface SearchFieldProps<T> {
	data: T[];
	onFiltered: (filteredData: T[]) => void;
	searchKey: keyof T;
	placeholder?: string;
}

const SearchField = <T,>({
	data,
	onFiltered,
	searchKey,
	placeholder = 'Buscar...',
}: SearchFieldProps<T>) => {
	const [filter, setFilter] = useState('');

	useEffect(() => {
		const filtered = data.filter((item) =>
			String(item[searchKey]).toLowerCase().includes(filter.toLowerCase())
		);

		onFiltered(filtered);
	}, [filter, data, searchKey, onFiltered]);

	return (
		<TextField
			fullWidth
			placeholder={placeholder}
			variant='standard'
			size='small'
			sx={{ mt: '1rem' }}
			slotProps={{
				input: {
					startAdornment: (
						<InputAdornment position='start'>
							<SearchIcon />
						</InputAdornment>
					),
					endAdornment: filter && (
						<IconButton size='small' onClick={() => setFilter('')}>
							<ClearIcon sx={{ width: '1rem' }} />
						</IconButton>
					),
				},
			}}
			value={filter}
			onChange={(e) => setFilter(e.target.value)}
		/>
	);
};

export default SearchField;
