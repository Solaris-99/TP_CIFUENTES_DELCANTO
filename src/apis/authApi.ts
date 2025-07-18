import type {
	LoginCredentials,
	RegisterData,
	User,
	UserRole,
} from '@/features/auth/types/authTypes';
import client from './axios';

interface AuthSuccessResponse {
	token: string;
	refreshToken: string;
}

// TODO: Organize user types
interface Profile {
	id: string;
	name: string;
	email: string;
	title?: string;
	is_coordinator: boolean;
}

export const authEndpoints = {
	login: (credentials: LoginCredentials) =>
		client.post<AuthSuccessResponse>('/auth', credentials),
	getProfile: () => client.get<Profile>('/auth/profile'),
	register: (data: RegisterData) =>
		client.post<AuthSuccessResponse>('/auth/register', data),
};

// export const authEndpoints = {
// 	login: (credentials: LoginCredentials) => {
// 		return {
// 			// Mocked response for demonstration purposes
// 			data: {
// 				token: 'mocked_token_1234567890',
// 				user: {
// 					id: 1,
// 					email: credentials.email,
// 					name: 'Pepito perez',
// 					role: 'coordinator' as UserRole,
// 				},
// 			},
// 		};
// 	},
// };
