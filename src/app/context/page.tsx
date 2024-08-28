"use client";

import type React from "react";
import {
	createContext,
	type SetStateAction,
	useContext,
	useState,
} from "react";

// we will use the best practices in this example
type TContextProps = {
	darkTheme: boolean;
	setDarkTheme: React.Dispatch<SetStateAction<boolean>>;
};

//first create a context
const Context = createContext<TContextProps | null>(null);

//second create a context provider hook
export const useContextProvider = () => {
	const context = useContext(Context);
	if (context === null) {
		throw new Error("Context must be used inside the context provider");
	}
	return context;
};

// then create the actuall context provider encapsulater
export const ContextProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const [darkTheme, setDarkTheme] = useState<boolean>(true);
	return (
		<Context.Provider value={{ darkTheme, setDarkTheme }}>
			{children}
		</Context.Provider>
	);
};
