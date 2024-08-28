"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type TstateWithObjects = {
	name: string;
	counter: number;
};

const StateInReact = () => {
	// this is good
	const [state, setState] = useState<number>(0);

	//but you can also use this, supposed you have something that is very heavy computational okie
	//you can return a callback in the use state and that function will only run means
	// meaning it will increase the perfomance
	const [perfomanceState, setPerfomanceState] = useState<number>(() => {
		console.log("This only runs once");
		return 0;
	});

	// invoking this function will not decrement the value by twice as the updated state are asynchronus, so you are just updating the state value twice with its orignal value orihinal value before even they were updated
	const decrement = () => {
		setState(state - 1);
		setState(state - 1);
	};

	//rather do this as the previous value provides the uptodate value each time the function is called.
	const decrementTwice = () => {
		setState((prev) => prev - 1);
		setState((prev) => prev - 1);
	};

	//state with objects
	const [stateWithObjects, setStateWithObjects] = useState<TstateWithObjects>({
		name: "dhruv",
		counter: 0,
	});

	console.log(setStateWithObjects.name);

	return (
		<div className="flex dark items-center flex-col gap-8 justify-center h-screen w-full">
			<h1 className="text-4xl font-bold mb-10">useState hook</h1>
			<div className="flex gap-3  items-center">
				<p>Normal state</p>
				<Button
					type="button"
					onClick={() => {
						setState((prev) => prev + 1);
					}}
				>
					+
				</Button>
				<div className=" min-w-5 text-center">{state}</div>
				<Button type="button" onClick={decrementTwice}>
					-
				</Button>
			</div>
			<div className="flex gap-3  items-center">
				<p>Object state</p>
				<Button
					type="button"
					onClick={() => {
						//Importance to notice, when you update the object, you need to makesure you update with all the oldvalues aka ...prev, because they don't get megred automatically

						//and the reason why automatic merging doesn't occur is because, when you use state with objects like these, you will end up having mutliple hooks
						setStateWithObjects((prev) => {
							return {
								...prev,
								counter: prev.counter + 1,
							};
						});
					}}
				>
					+
				</Button>
				<div className=" min-w-5 text-center">
					{stateWithObjects.name} - {stateWithObjects.counter}
				</div>
				<Button
					type="button"
					onClick={() => {
						setStateWithObjects((prev) => {
							return {
								...prev,
								counter: prev.counter - 1,
							};
						});
					}}
				>
					-
				</Button>
			</div>
		</div>
	);
};

export default StateInReact;
