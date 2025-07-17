export type Status = 'Activo' | 'Suspendido' | 'Completo';
export type RegistryValues = 'NR' | '+' | '-';

export interface Unit {
	id: number;
	program_id: number;
	created: Date;
	updated: Date;
	title: string;
	status: Status;
}

export interface Program {
	id: number;
	patient_id: number;
	date_creation: Date;
	last_updated: Date;
	name: string;
	antecedent: string;
	status: Status;
	units: Unit[];
}

export interface Registry {
	id: number;
	date_created: Date;
	value: RegistryValues;
	therapist_id: number;
}
