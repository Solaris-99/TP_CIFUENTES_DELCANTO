import { z } from 'zod';

export const createPatientSchema = z.object({
	name: z
		.string()
		.min(2, 'Ingresar un nombre válido')
		.max(50, 'El nombre debe tener menos de 50 carácteres'),
	dni: z.string().optional(),
	diagnosis: z.string().optional(),
	observations: z.string().optional(),
	birthdate: z.string().optional(),
});

export type CreatePatientValues = z.infer<typeof createPatientSchema>;
