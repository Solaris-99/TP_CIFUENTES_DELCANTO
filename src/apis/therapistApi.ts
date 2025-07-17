import type { Therapist } from '@/features/therapist/types/therapistsTypes';
import api from './axios';

export const therapistEndpoints = {
	get: (id: number) => {
		return api.get<Therapist>(`/therapists/${id}`);
	},
	getAll: () => {
		return api.get<Therapist[]>('/therapists/');
	},
	delete: (id: number) => {
		return api.delete(`/therapists/${id}`);
	},
	update: (id: number, therapist: Therapist) => {
		return api.patch<Therapist>(`/therapists/${id}`, therapist);
	},
};
