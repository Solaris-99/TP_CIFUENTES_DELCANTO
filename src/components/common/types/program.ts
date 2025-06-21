export type Status = 'Activo' | 'Suspendido' | 'Completo';

export type Program = {
	id: number;
	dateCreation: Date;
	lastUpdated: Date;
	name: string;
	antecedent: string;
	status: Status;
};
