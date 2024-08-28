"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";

const Page = () => {
	const [number, setNumber] = useState<number>(0);
	const [dark, setDark] = useState<boolean>(true);

	// use memo returns the only return value
	// use call back returns the function
	const getItems = useCallback(() => {
		return [number, number + 1, number + 2];
	}, [number]);

	return (
		<div className="h-screen w-full flex items-center justify-center">
			<div className="max-w-3xl space-y-2">
				<Input
					className={`${dark ? "bg-neutral-900 text-white" : "bg-white text-black"} transition-all border-none`}
					defaultValue={0}
					type="number"
					placeholder="Enter a number"
					onChange={(e) =>
						setNumber(() => {
							if (e.target.value === "") {
								return 0;
							}
							return Number.parseInt(e.target.value);
						})
					}
				/>

				{/* This button toggles the theme but it still prints out the updating item of the useEffect provided in the list, because technically the List is re-rendering */}
				<Button onClick={() => setDark((prev) => !prev)}>Toggle theme</Button>
				<NumberList getItems={getItems} />
			</div>
		</div>
	);
};

type TNumberListProps = {
	getItems: () => number[];
};

const NumberList = ({ getItems }: TNumberListProps) => {
	const [numberState, setNumberState] = useState<number[]>([]);
	2;

	// if the useCallBack is used here, then the console will not output the log when changing the theme
	useEffect(() => {
		const newNumbers = getItems();
		setNumberState((prev) => newNumbers);
		//inspect the page to see this value
		console.log("Updating items");
	}, [getItems]);

	return numberState.map((number) => {
		return <div key={number}>{number} </div>;
	});
};

export default Page;

// useMemo: Returns and stores the calculated value of a function in a variable
// useCallBack: Returns and stores the actual function itself in a variable

// 1. Re-rendering and recreation:
//    You're correct that when a component re-renders, its local variables and functions are generally recreated. This happens regardless of whether the component itself is memoized.

// 2. Memoization of components:
//    Memoizing a component (using `React.memo()`) doesn't prevent the recreation of its internal variables and functions. Instead, it prevents the component from re-rendering if its props haven't changed.

// 3. Memoization of values and functions:
//    To prevent recreation of specific values or functions within a component, you use hooks like `useMemo` and `useCallback`, not component memoization.

// Here's a more detailed breakdown:

// 1. Variables:
//    - Local variables declared inside the component function body are recreated on every render.
//    - State variables (created with `useState`) persist between renders, but calling their setter functions triggers a re-render.

// 2. Functions:
//    - Functions declared inside the component are recreated on every render.
//    - To prevent recreation, you can use `useCallback`.

// 3. Objects and arrays:
//    - If declared inside the component, these are recreated on every render.
//    - To prevent recreation, you can use `useMemo`.

// 4. Props:
//    - New prop objects are created on every render of the parent component.
//    - The child component will re-render if it receives new prop references, even if the values are the same.

// 5. Memoized components (using `React.memo`):
//    - The component still executes its function body on every render of its parent.
//    - However, React will reuse the last rendered result if the props are the same (by shallow comparison).

// So, to optimize your code:

// - Use `React.memo()` to memoize entire components when appropriate.
// - Use `useCallback()` for functions that are passed as props or used in dependency arrays.
// - Use `useMemo()` for expensive computations or to maintain referential equality of objects and arrays.

// Your understanding is good, but remember that memoizing a component doesn't stop its internal logic from running - it just prevents unnecessary re-rendering and re-reconciliation of the virtual DOM.
