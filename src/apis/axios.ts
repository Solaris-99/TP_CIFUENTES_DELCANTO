import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { API_BASE_URL, API_HEADERS, API_TIMEOUT } from 'constants/apiConstants';

export interface ApiErrorResponse {
	message: string;
	code: string;
	statusCode: number;
	timestamp: string;
	path: string;
}

const api: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: API_HEADERS,
	timeout: API_TIMEOUT,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('refreshToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => response,
	(error: AxiosError<ApiErrorResponse>) => {
		console.error('Error de API:', error.response?.data || error.message);
		if (error.response?.status === 401) {
			console.error('Unauthorized: Token expired or invalid.');
			localStorage.removeItem('auth');
			location.reload();
		}
		return Promise.reject(error);
	}
);

export default api;
