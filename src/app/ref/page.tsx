"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";

const RefComponent = () => {
	// `renderCount` is a ref that persists its value across re-renders
	// and does not trigger a re-render when updated.const renderCount = useRef<number>(1);
	const renderCount = useRef<number>(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const [name, setName] = useState<string>("");

	useEffect(() => {
		renderCount.current = renderCount.current + 1;
		console.log("hello world: ", renderCount.current);
	});

	// refs are majority of the time used to reference the html tags like how we are doing here with the input element
	// refs are also used to persists their value without causing the render
	const focusInputBox = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	// one more use case is that you can use to store the previous value of the state
	// for example lets save the previous name
	const previousNameRef = useRef<string>("");
	useEffect(() => {
		previousNameRef.current = name;
	});
	return (
		<div className="h-screen flex-col gap-3 w-full flex items-center justify-center">
			<h1 className="text-4xl font-bold mb-10">useRef hook</h1>
			<Input
				value={name}
				className=" max-w-[300px]"
				onChange={(e) => setName(e.target.value)}
				type="text"
				ref={inputRef}
				placeholder="Enter your name"
			/>
			<p>
				My name is: {name}{" "}
				{previousNameRef.current === ""
					? ""
					: `and it used to be: ${previousNameRef.current}`}
			</p>
			<p>This component has rendered {renderCount.current} </p>
			<Button onClick={focusInputBox}>Focus Input</Button>
		</div>
	);
};

export default RefComponent;




// State (`useState`):

// 1. Triggering re-renders:
//    - When you update a state value using its setter function, it triggers a re-render of the component.

// 2. Access and updates:
//    - You access the current state value directly from the state variable.
//    - You update state using the setter function, which queues a re-render.

// 3. Timing of updates:
//    - State updates are asynchronous. React batches state updates for performance.
//    - The new state value is available in the next render.

// 4. Use cases:
//    - Used for values that, when changed, should cause the component to re-render.
//    - Typically used for data that is directly rendered in the UI.

// Ref (`useRef`):

// 1. Triggering re-renders:
//    - Changing a ref value does not trigger a re-render.

// 2. Access and updates:
//    - You access and update the current value through the `.current` property.
//    - You can update a ref's value at any time without triggering a re-render.

// 3. Timing of updates:
//    - Ref updates are synchronous. The new value is immediately available.

// 4. Use cases:
//    - Used for values that need to persist between renders but shouldn't cause re-renders when changed.
//    - Often used for storing references to DOM elements, timers, or any mutable value that doesn't affect the render output directly.

// Key Differences:

// 1. Re-render behavior:
//    - Updating state causes re-renders; updating refs doesn't.

// 2. Synchronicity:
//    - State updates are asynchronous; ref updates are synchronous.

// 3. Syntax:
//    - State: `const [value, setValue] = useState(initialValue);`
//    - Ref: `const valueRef = useRef(initialValue);`

// 4. Updating:
//    - State: `setValue(newValue);`
//    - Ref: `valueRef.current = newValue;`

// 5. Reading:
//    - State: `value`
//    - Ref: `valueRef.current`

// Example to illustrate the difference:

// ```jsx
// function ExampleComponent() {
//   const [count, setCount] = useState(0);
//   const countRef = useRef(0);

//   const incrementState = () => {
//     setCount(count + 1); // Triggers a re-render
//   };

//   const incrementRef = () => {
//     countRef.current += 1; // Doesn't trigger a re-render
//     console.log(countRef.current); // Immediately logs the new value
//   };

//   console.log("Component rendered");

//   return (
//     <div>
//       <p>State count: {count}</p>
//       <p>Ref count: {countRef.current}</p>
//       <button onClick={incrementState}>Increment State</button>
//       <button onClick={incrementRef}>Increment Ref</button>
//     </div>
//   );
// }
// ```

// In this example, clicking "Increment State" will update the UI and log "Component rendered". Clicking "Increment Ref" will update the ref value (visible in the console log) but won't update the UI or cause a re-render.

// This difference makes refs useful for storing values that need to persist between renders but don't affect the UI directly, while state is used for values that, when changed, should be reflected in the UI.