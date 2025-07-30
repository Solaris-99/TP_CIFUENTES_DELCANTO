import type { ApiErrorResponse } from '@/apis/axios';
import {
	patientProgramEndpoints,
	patientRegistry,
	patientTeamEndpoints,
	patientUnitsEndpoints,
	patientsEndpoints,
} from '@/apis/patientsApi';
import type { Patient } from '@/features/patient/types/patient';
import type {
	Program,
	Registry,
	RegistryValues,
	Status,
	Unit,
} from '@/features/patient/types/program';
import type { Therapist } from '@/features/therapist/types/therapistsTypes';
import { isAxiosError } from 'axios';
import type { CreatePatientValues } from '../schema/createPatientSchema';

export const getPatients = async (): Promise<Patient[]> => {
	try {
		const response = await patientsEndpoints.getAll();
		const patients: Patient[] = response.data.map((p) => ({
			...p,
			date_creation: new Date(p.date_creation),
			birthdate: p.birthdate ? new Date(p.birthdate) : undefined,
		}));
		return patients;
	} catch (error: unknown) {
		let message = 'Error al obtener los pacientes.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const getCurrentUserPatients = async (): Promise<Patient[]> => {
	try {
		const response = await patientsEndpoints.getByCurrentUser();
		const patients: Patient[] = response.data.map((p) => ({
			...p,
			date_creation: new Date(p.date_creation),
			birthdate: p.birthdate ? new Date(p.birthdate) : undefined,
		}));
		return patients;
	} catch (error: unknown) {
		let message = 'Error al obtener los pacientes.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const getPatient = async (id: number): Promise<Patient> => {
	try {
		const response = await patientsEndpoints.get(id);
		const p = response.data;
		return {
			...p,
			date_creation: new Date(p.date_creation),
			birthdate: p.birthdate ? new Date(p.birthdate) : undefined,
		};
	} catch (error: unknown) {
		let message = 'Error al obtener el paciente.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const deletePatient = async (id: number) => {
	try {
		return await patientsEndpoints.delete(id);
	} catch (error: unknown) {
		let message = 'Error al borrar el paciente.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const createPatient = async (
	patient: CreatePatientValues
): Promise<Patient> => {
	try {
		const response = await patientsEndpoints.create(patient);
		const p = response.data;
		return {
			...p,
			date_creation: new Date(p.date_creation),
			birthdate: p.birthdate ? new Date(p.birthdate) : undefined,
		};
	} catch (error: unknown) {
		let message = 'Error al crear el paciente.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

// -- Team --

export const getPatientTeam = async (
	patientId: number
): Promise<Therapist[]> => {
	try {
		const response = await patientTeamEndpoints.get(patientId);
		return response.data;
	} catch (error: unknown) {
		let message = 'Error al obtener el equipo del paciente.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const addTherapistToPatient = async (
	patientId: number,
	therapistId: number
) => {
	try {
		return await patientTeamEndpoints.addTherapist(patientId, therapistId);
	} catch (error: unknown) {
		let message = 'Error al agregar terapeuta al paciente.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const removeTherapistFromPatient = async (
	patientId: number,
	therapistId: number
) => {
	try {
		return await patientTeamEndpoints.removeTherapist(patientId, therapistId);
	} catch (error: unknown) {
		let message = 'Error al remover terapeuta del paciente.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

// -- Programs --

export const getPatientPrograms = async (
	patientId: number
): Promise<Program[]> => {
	try {
		const response = await patientProgramEndpoints.get(patientId);
		const programs = response.data.map((program) => ({
			...program,
			date_creation: new Date(program.date_creation),
			last_updated: new Date(program.last_updated),
		}));
		return programs;
	} catch (error: unknown) {
		let message = 'Error al obtener los programas del paciente.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const getPatientProgram = async (
	programId: number
): Promise<Program> => {
	try {
		const program = await patientProgramEndpoints.getById(programId);
		if (!program) {
			throw new Error('Programa no encontrado.');
		}
		return program.data;
	} catch (error: unknown) {
		let message = 'Error al obtener el programa del paciente.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const addPatientProgram = async (
	patientId: number,
	name: string
): Promise<Program> => {
	try {
		const response = await patientProgramEndpoints.add(patientId, name);
		return response.data;
	} catch (error: unknown) {
		let message = 'Error al agregar un programa.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const removeProgram = async (programId: number) => {
	try {
		return await patientProgramEndpoints.remove(programId);
	} catch (error: unknown) {
		let message = 'Error al eliminar el programa.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const updateProgramStatus = async (
	patientId: number,
	programId: number,
	status: Status
) => {
	try {
		return await patientProgramEndpoints.updateStatus(
			patientId,
			programId,
			status
		);
	} catch (error: unknown) {
		let message = 'Error al actualizar el estado del programa.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const updateProgramBackground = async (
	programId: number,
	background: string
) => {
	try {
		return await patientProgramEndpoints.updateBackground(
			programId,
			background
		);
	} catch (error: unknown) {
		let message = 'Error al actualizar los antecedentes del programa.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const getProgramBackground = async (
	programId: number
): Promise<string> => {
	try {
		const response = await patientProgramEndpoints.getById(programId);
		if (!response.data) {
			throw new Error('Programa no encontrado.');
		}
		return response.data.antecedent || '';
	} catch (error: unknown) {
		let message = 'Error al obtener los antecedentes del programa.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

// -- Units --

export const getProgramUnits = async (
	patientId: number,
	programId: number
): Promise<Unit[]> => {
	try {
		const response = await patientUnitsEndpoints.get(patientId, programId);
		const units = response.data.map((unit) => ({
			...unit,
			date_created: new Date(unit.date_created),
			last_updated: new Date(unit.last_updated),
		}));
		return units;
	} catch (error: unknown) {
		let message = 'Error al obtener unidades.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const addUnit = async (
	programId: number,
	name: string
): Promise<Unit> => {
	try {
		const response = await patientUnitsEndpoints.add(programId, name);
		return response.data;
	} catch (error: unknown) {
		let message = 'Error al agregar unidad.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const updateUnitStatus = async (
	patientId: number,
	programId: number,
	unitId: number,
	status: Status
) => {
	try {
		return await patientUnitsEndpoints.updateStatus(
			patientId,
			programId,
			unitId,
			status
		);
	} catch (error: unknown) {
		let message = 'Error al actualizar el estado de la unidad.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

// -- Registry --

export const getRegistry = async (
	patientId: number,
	programId: number,
	unitId: number
): Promise<Registry[]> => {
	try {
		const response = await patientRegistry.get(patientId, programId, unitId);
		return response.data;
	} catch (error: unknown) {
		let message = 'Error al obtener registros.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const addRegistry = async (
	patientId: number,
	programId: number,
	unitId: number,
	value: RegistryValues
) => {
	try {
		return await patientRegistry.add(patientId, programId, unitId, value);
	} catch (error: unknown) {
		let message = 'Error al agregar registro.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};

export const deleteRegistry = async (
	patientId: number,
	programId: number,
	unitId: number,
	registryId: number
) => {
	try {
		return await patientRegistry.delete(
			patientId,
			programId,
			unitId,
			registryId
		);
	} catch (error: unknown) {
		let message = 'Error al borrar registro.';
		if (isAxiosError<ApiErrorResponse>(error)) {
			message = error.response?.data?.message || message;
		}
		console.log(error);
		throw new Error(message);
	}
};
