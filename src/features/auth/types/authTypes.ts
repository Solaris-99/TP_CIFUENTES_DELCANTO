export type LoginCredentials = {
	email: string;
	password: string;
};

export type RegisterData = {
	name: string;
	email: string;
	password: string;
};

export type UserRole = 'coordinator' | 'therapist';

export type User = {
	id: number;
	email: string;
	name: string;
	role: UserRole;
};
