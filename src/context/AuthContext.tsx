import type { User } from '@/features/auth/types/authTypes';
import { type FC, createContext, useState } from 'react';

interface AuthProviderProps {
	children: React.ReactNode;
}
interface AuthContextType {
	user: User | null;
	setUser: (user: User | null) => void;
	token: string | null;
	setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<null | User>(null);
	const [token, setToken] = useState<null | string>(null);

	return (
		<AuthContext.Provider value={{ user, setUser, token, setToken }}>
			{children}
		</AuthContext.Provider>
	);
};
