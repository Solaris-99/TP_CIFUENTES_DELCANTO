import type { Therapist } from '@/features/therapist/types/therapistsTypes';
import client from './axios';

export const therapistEndpoints = {
	get: (id: number) => {
		return client.get<Therapist>(`/therapists/${id}`);
	},
	getAll: () => {
		return client.get<Therapist[]>('/therapists/');
	},
	delete: (id: number) => {
		return client.delete(`/therapists/${id}`);
	},
	update: (id: number, therapist: Therapist) => {
		return client.post<Therapist>(`/therapists/${id}`, therapist);
	},
};
