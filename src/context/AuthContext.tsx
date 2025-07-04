import type { User } from '@/features/auth/types/authTypes';
import { type FC, createContext, useState } from 'react';

interface AuthProviderProps {
	children: React.ReactNode;
}
interface AuthContextType {
	user: User | null;
	setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<null | User>(null);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
