// src/context/ThemeContext.tsx
"use client";

import type { ReactNode } from "react";
import {
	createContext,
	type SetStateAction,
	useContext,
	useState,
} from "react";

type TContextProps = {
	darkTheme: boolean;
	setDarkTheme: React.Dispatch<SetStateAction<boolean>>;
};

const Context = createContext<TContextProps | null>(null);

export const useContextProvider = () => {
	const context = useContext(Context);
	if (!context) {
		throw new Error("useContextProvider must be used within a ContextProvider");
	}
	return context;
};

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const [darkTheme, setDarkTheme] = useState<boolean>(true);
	return (
		<Context.Provider value={{ darkTheme, setDarkTheme }}>
			{children}
		</Context.Provider>
	);
};
