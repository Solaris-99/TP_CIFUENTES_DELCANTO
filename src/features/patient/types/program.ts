export type Status = 'Activo' | 'Suspendido' | 'Completo';
export type RegistryValues = 'NR' | '+' | '-';

export interface Unit {
	id: number;
	program_id: number;
	date_created: Date;
	last_updated: Date;
	name: string;
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
	unit_count: number;
	unit_active_count: number;
	unit_completed_count: number;
}

export interface Registry {
	id: number;
	date_created: Date;
	value: RegistryValues;
	therapist_id: number;
}
