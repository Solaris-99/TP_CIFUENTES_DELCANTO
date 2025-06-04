export type Patient = {
	id: number;
	dateCreation: Date;
	name: string;
	dni?: number;
	diagnosis?: string;
	observations?: string;
	birthdate?: Date;
};
