export type Patient = {
	id: number;
	date_creation: Date;
	name: string;
	dni?: number;
	diagnosis?: string;
	observations?: string;
	birthdate?: Date;
};
