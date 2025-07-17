import type { Patient } from '@/features/patient/types/patient';
import type {
	Program,
	Registry,
	RegistryValues,
	Status,
	Unit,
} from '@/features/patient/types/program';
import type { Therapist } from '@/features/therapist/types/therapistsTypes';
import api from './axios';

export const patientsEndpoints = {
	get: (id: number) => api.get<Patient>(`/patients/${id}`),
	getByCurrentUser: () => api.get<Patient[]>('/patients/myPatients'),
	getAll: () => api.get<Patient[]>('/patients/'),
	delete: (id: number) => api.delete(`/patients/${id}`),
	create: (patient: Patient) => api.post<Patient>('/patients/', patient),
};

export const patientTeamEndpoints = {
	get: (patientId: number) =>
		api.get<Therapist[]>(`/patients/${patientId}/team`),
	addTherapist: (patientId: number, therapistId: number) =>
		api.post(`/patients/${patientId}/team`, therapistId),
	removeTherapist: (patientId: number, therapistId: number) =>
		api.delete(`/patients/${patientId}/team/${therapistId}`),
};

export const patientProgramEndpoints = {
	get: (patientId: number) =>
		api.get<Program[]>(`/patients/${patientId}/programs`),
	add: (patientId: number, program: Program) =>
		api.post(`/patients/${patientId}/programs`, program),
	updateStatus: (patientId: number, programId: number, status: Status) =>
		api.patch(`/patients/${patientId}/programs/${programId}`, status),
	updateBackground: (
		patientId: number,
		programId: number,
		background: string
	) =>
		api.put(
			`/patients/${patientId}/programs/${programId}/background`,
			background
		),
};

export const patientUnitsEndpoints = {
	get: (patientId: number, programId: number) =>
		api.get<Unit[]>(`/patients/${patientId}/programs/${programId}/units`),
	add: (patientId: number, programId: number, unit: Unit) =>
		api.post(`/patients/${patientId}/programs/${programId}/units`, unit),
	updateStatus: (
		patientId: number,
		programId: number,
		unitId: number,
		status: Status
	) =>
		api.patch(
			`/patients/${patientId}/programs/${programId}/units/${unitId}`,
			status
		),
};

export const patientRegistry = {
	get: (patientId: number, programId: number, unitId: number) =>
		api.get<Registry[]>(
			`/patients/${patientId}/programs/${programId}/units/${unitId}/registry`
		),
	add: (
		patientId: number,
		programId: number,
		unitId: number,
		registryValue: RegistryValues
	) =>
		api.post(
			`/patients/${patientId}/programs/${programId}/units/${unitId}/registry`,
			{ registry: registryValue }
		),
	delete: (
		patientId: number,
		programId: number,
		unitId: number,
		registryId: number
	) =>
		api.delete(
			`/patients/${patientId}/programs/${programId}/units/${unitId}/registry/${registryId}`
		),
};
