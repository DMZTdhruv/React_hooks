"use client";

import { Oldenburg } from "next/font/google";
import React, { useEffect, useState } from "react";

const EffectHook = () => {
	const [state, setState] = useState<boolean>(true);
	const [someBoolState, setSomeBoolState] = useState<boolean>(false);
	const [oldEffectValue, setOldEffectValue] = useState<number>(0);

	// this hook is rendered everytime the hook is updated
	useEffect(() => {
		console.log("Oh I have no dependency so I render everytime haha~");
	});

	// this hook renders only once after the initial render
	useEffect(() => {
		console.log(
			"Boom I only log here once after the initial render haha because I have empty dependency.",
		);
	}, []);

	// this hook renders only everytime the state passed in dependecy changes haha.
	useEffect(() => {
		const lol = someBoolState ? "true" : "false";
		console.log(
			"I was logged here because you changed the state which was included in the dependency",
			lol,
		);
	}, [someBoolState]);

	useEffect(() => {
		console.log("new oldEffectValue value: ", oldEffectValue);
		return () => {
			console.log("previouse oldEffectValue value: ", oldEffectValue);
		};
	}, [oldEffectValue]);

	return (
		<div className="flex flex-col gap-2 h-screen justify-center items-center w-full">
			<h1 className="text-4xl font-bold mb-10">useEffect hook</h1>
			<button
				type="button"
				className={`${someBoolState ? "bg-blue-300" : "bg-purple-300"} text-black font-bold px-2 py-2 rounded-md`}
				onClick={() => setSomeBoolState((prev) => !prev)}
			>
				Dependency
			</button>
			<button
				type="button"
				className={`${state ? "bg-red-300" : " bg-teal-300"} text-black font-bold px-2 py-2 rounded-md`}
				onClick={() => setState((prev) => !prev)}
			>
				No dependecy
			</button>
			<button
				type="button"
				className="active:bg-neutral-800 px-4 py-2 rounded-md hover:bg-neutral-700 text-white font-bold bg-neutral-800"
				onClick={() => setOldEffectValue((prev) => prev + 1)}
			>
				mount and unmount button {oldEffectValue}
			</button>
		</div>
	);
};

export default EffectHook;
