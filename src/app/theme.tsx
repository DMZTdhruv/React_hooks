"use client";

import { Switch } from "@/components/ui/switch";
import Sidebar from "./_components/sidebar";
import { useContextProvider } from "@/context/ThemeContext";
import { Label } from "@/components/ui/label";

const Theme = ({ children }: { children: React.ReactNode }) => {
	const { darkTheme, setDarkTheme } = useContextProvider();
	return (
		<main
			className={`min-h-screen flex flex-col items-center justify-center ${
				darkTheme ? "bg-neutral-950 text-white" : "bg-neutral-100 text-black"
			}`}
		>
			<div className="flex items-center fixed top-8 right-8 space-x-2">
				<Switch
					id="airplane-mode"
					onClick={() => setDarkTheme((prev) => !prev)}
				/>
				<Label htmlFor="airplane-mode">
					{darkTheme ? "Light" : "Dark"} mode
				</Label>
			</div>
			<Sidebar />
			<div className="flex flex-col  items-center justify-center space-y-4">
				{children}
			</div>
		</main>
	);
};

export default Theme;
