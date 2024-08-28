"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useContextProvider } from "../context/page";

const slowFunction = (num: number) => {
	console.log("Callling slow function");
	for (let i = 0; i < 500_000_000; i++) {}
	return num * 2;
};

const MemoCode = () => {
	const { darkTheme } = useContextProvider();
	const [number, setNumber] = useState<number>(0);
	const [dark, setDark] = useState<boolean>(darkTheme);

	// What actually happens is:
	// The memoized value is only recalculated when number changes.
	// Changing the theme will not trigger a recalculation of doubleNumber, but this is because theme is not in the dependency array, not because of useMemo itself.
	const doubleNumber = useMemo(() => {
		return slowFunction(number);
	}, [number]);

	const someRandomObject = useMemo(() => {
		return {
			title: "The Random Obect.",
			content: "Hello this is the content of some random string",
			problem: "New object is created everytime we render this app",
		};
	}, []);

	useEffect(() => {
		console.log(someRandomObject);
	}, [someRandomObject]);

	return (
		<div
			className={`h-screen w-full transition-all ${darkTheme ? "bg-neutral-950 text-white" : "bg-neutral-100 text-neutral-950"} items-center justify-center flex flex-col`}
		>
			<h1 className="text-4xl font-bold mb-10">useMemo hook</h1>
			<input
				type="number"
				className={`overflow-y-hidden transition-all  rounded-md ${dark ? "bg-neutral-900 border-neutral-700 border  text-white" : "bg-neutral-100 border-neutral-500 border text-neutral-950"} irounded-md px-2 py-1`}
				value={number}
				onChange={(e) => setNumber(Number.parseInt(e.target.value))}
			/>

			<div className="my-2">{doubleNumber}</div>
			<button
				type="button"
				className={`px-2 py-1 transition-all rounded-md ${dark ? "bg-neutral-100 text-neutral-800" : "bg-neutral-900 text-white"}`}
				onClick={() => setDark((prev) => !prev)}
			>
				Change theme
			</button>
		</div>
	);
};

export default MemoCode;
