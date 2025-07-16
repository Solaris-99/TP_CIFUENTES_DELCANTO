interface Therapist {
	id: number;
	email: string;
	name: string;
	is_coordinator: boolean;
	date_creation: Date;
	last_login?: Date;
	title?: string;
}

export type { Therapist };
