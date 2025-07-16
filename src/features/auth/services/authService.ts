import { authEndpoints } from '@/apis/authApi';
import type { ApiErrorResponse } from '@/apis/axios';
import { isAxiosError } from 'axios';
import type { LoginCredentials, LoginResponse, User } from '../types/authTypes';

export const loginUser = async (
	credentials: LoginCredentials
): Promise<LoginResponse> => {
	try {
		const responseTokens = await authEndpoints.login(credentials);
		const { token, refreshToken } = responseTokens.data;
		localStorage.setItem('token', token);
		localStorage.setItem('refreshToken', refreshToken);

		const responseProfile = await authEndpoints.getProfile();
		const apiUser = responseProfile.data;
		const user: User = {
			id: Number.parseInt(apiUser.id),
			email: apiUser.email,
			name: apiUser.name,
			role: apiUser.is_coordinator ? 'coordinator' : 'therapist',
		};

		localStorage.setItem('role', user.role);

		return { token, user };
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
		console.log(error);
		throw new Error(message);
	}
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
