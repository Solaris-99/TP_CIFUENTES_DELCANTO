import { z } from 'zod';

export const therapistSchema = z.object({
	email: z.string().email('Por favor ingresa un correo electrónico válido'),
	password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
	name: z.string().max(40, 'El nombre debe tener menos de 40 caracteres'),
	title: z.string(),
});

export type TherapistFormValues = z.infer<typeof therapistSchema>;
