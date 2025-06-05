import api from './axios';
import type {
	LoginCredentials,
	RegisterData,
	User,
	UserRole
} from '@/features/auth/types/authTypes';

interface AuthSuccessResponse {
	token: string;
	user: User;
}

// TODO: Remove this mock when the backend is ready

/* export const authEndpoints = {
	login: (credentials: LoginCredentials) =>
		api.post<AuthSuccessResponse>('/auth/login', credentials),
	register: (data: RegisterData) =>
		api.post<AuthSuccessResponse>('/auth/register', data),
}; */

export const authEndpoints = {
	login: (
		credentials: LoginCredentials
	) => {
		return {
			// Mocked response for demonstration purposes
			data: {
				token: 'mocked_token_1234567890',
				user: {
					id: 1,
					email: credentials.email,
					name: 'Mocked User',
					role: 'coordinator' as UserRole,
				},
			}
		};
	}
};
