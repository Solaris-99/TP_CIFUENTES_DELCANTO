export type Status = 'Activo' | 'Suspendido' | 'Completo';

export interface Step {
	id: number;
	title: string;
	status: Status;
}

export type Program = {
	id: number;
	dateCreation: Date;
	lastUpdated: Date;
	name: string;
	antecedent: string;
	status: Status;
	steps: Step[];
};
