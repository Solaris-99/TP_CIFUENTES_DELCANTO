export const API_BASE_URL: string =
	import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export const API_TIMEOUT: number =
	Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

export const API_HEADERS = {
	'Content-Type': 'application/json',
};
