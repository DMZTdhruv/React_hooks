"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useState, useTransition } from "react";

const Page = () => {
	//transition hook
	const [isPending, startTransition] = useTransition();

	const [inputWithoutTransitionHook, setInputWithoutTransitionHook] =
		useState<string>("");
	const [inputWithTransitionHook, setInputWithTransitionHook] =
		useState<string>("");

	//array without the transition hook
	const [renderedElements, setRenderedElements] = useState<string[]>([]);
	//array with the transition hook
	const [
		renderedElementsWithTransitionHook,
		setRenderedElementsWithTransitionHook,
	] = useState<string[]>([]);

	const LIST_SIZE = 8000;

	useEffect(() => {
		const listOfItems: string[] = [];
		for (let i = 0; i < LIST_SIZE; i++) {
			listOfItems.push(`${inputWithoutTransitionHook}_${i}`);
		}
		setRenderedElements(() => listOfItems);
	}, [inputWithoutTransitionHook]);

	useEffect(() => {
		startTransition(() => {
			const listOfItems: string[] = [];
			for (let i = 0; i < LIST_SIZE; i++) {
				listOfItems.push(`${inputWithTransitionHook}_${i}`);
			}
			setRenderedElementsWithTransitionHook(() => listOfItems);
		});
	}, [inputWithTransitionHook]);

	return (
		<div className="h-screen gap-3 w-full flex items-center justify-center">
			<div className="max-w-3xl space-y-2">
				<h2>This is without the transition hook</h2>
				<Input
					className={"bg-neutral-900 border-neutral-800 text-white"}
					type="text"
					placeholder="Enter a value"
					onChange={(e) => setInputWithoutTransitionHook(() => e.target.value)}
				/>

				<div className="max-h-[50vh] overflow-y-auto">
					{renderedElements.map((element) => (
						<div key={element}>{element}</div>
					))}
				</div>
			</div>
			<div className="max-w-3xl space-y-2">
				<h2>This is with the transition hook</h2>
				<Input
					className={"bg-neutral-900 border-neutral-800 text-white"}
					type="text"
					placeholder="Enter a value"
					onChange={(e) => setInputWithTransitionHook(() => e.target.value)}
				/>

				<div className="min-h-[50vh] max-h-[50vh] overflow-y-auto">
					{isPending
						? "Loading elements.."
						: renderedElementsWithTransitionHook.map((element) => (
								<div key={element}>{element}</div>
							))}
				</div>
			</div>
		</div>
	);
};

export default Page;
