import type { ApiErrorResponse } from '@/apis/axios';
import { therapistEndpoints } from '@/apis/therapistApi';
import type { Therapist } from '@/features/therapist/types/therapistsTypes';
import { isAxiosError } from 'axios';

export const getTherapists = async (): Promise<Therapist[]> => {
	try {
		const response = await therapistEndpoints.getAll();
		const therapists: Therapist[] = response.data.map((t) => {
			return {
				id: t.id,
				email: t.email,
				name: t.name,
				is_coordinator: t.is_coordinator,
				date_creation: new Date(t.date_creation),
				last_login: t.last_login ? new Date(t.last_login) : undefined,
				title: t.title,
			};
		});

		return therapists;
	} catch (error: unknown) {
		let message = 'Error al obtener los terapeutas.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			if (error.response?.status === 403) {
				message = 'No posees permiso para ver esto.';
			} else {
				message = error.response?.data?.message || message;
			}
		}
		console.log(error);
		throw new Error(message);
	}
};

export const deleteTherapist = async (id: number) => {
	try {
		const response = await therapistEndpoints.delete(id);
		return response;
	} catch (error: unknown) {
		let message = 'Error al borrar el terapeuta.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			if (error.response?.status === 403) {
				message = 'No posees permiso para ver esto.';
			} else {
				message = error.response?.data?.message || message;
			}
		}
		console.log(error);
		throw new Error(message);
	}
};
