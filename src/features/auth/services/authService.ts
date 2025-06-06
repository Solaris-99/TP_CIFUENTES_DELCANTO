import { authEndpoints } from '@/apis/authApi';
import type { ApiErrorResponse } from '@/apis/axios';
import { isAxiosError } from 'axios';
import type { LoginCredentials, User } from '../types/authTypes';

export const loginUser = async (
	credentials: LoginCredentials
): Promise<User> => {
	try {
		const response = await authEndpoints.login(credentials);
		const { token, user: apiUser } = response.data;

		// TODO: Save all in store
		localStorage.setItem('auth', token);

		const user: User = {
			id: apiUser.id,
			email: apiUser.email,
			name: apiUser.name,
			role: apiUser.role,
		};

		return user;
	} catch (error: unknown) {
		let message = 'Error al iniciar sesión.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			if (error.response?.status === 401) {
				message =
					'Credenciales inválidas. Por favor, verifica tu email y contraseña.';
			} else {
				message = error.response?.data?.message || message;
			}
		}
		throw new Error(message);
	}
};

export const logoutUser = () => {
	localStorage.removeItem('auth');
};

/* export const registerUser = async (
	data: RegisterData
): Promise<LoginResult> => {
	try {
		const response = await authEndpoints.register(data);
		const { token, user: apiUser } = response.data;

		localStorage.setItem('authToken', token);

		const user: User = {
			id: apiUser.id,
			email: apiUser.email,
			name: apiUser.name || 'Nuevo Usuario',
			// ...
		};

		useAuthStore.getState().login(user, token);

		return { user, token };
	} catch (error: any) {
		if (error.response?.status === 409) {
			// Por ejemplo, si el email ya existe
			throw new Error('Este email ya está registrado.');
		}
		throw new Error(
			error.response?.data?.message || 'Error al registrar el usuario.'
		);
	}
}; */
