"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { hooksLearnt } from "../constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContextProvider } from "../context/page";

const Sidebar = () => {
	const [open, setOpen] = useState<boolean>(true);
	const pathname = usePathname();

	const { darkTheme } = useContextProvider();
	const darkThemeTextClass = darkTheme
		? "text-neutral-100"
		: "text-neutral-900";
	return (
		<div className="h-screen top-0 left-0 fixed">
			<button
				className={`underline  ${darkThemeTextClass} absolute z-10 m-8`}
				type="button"
				onClick={() => setOpen((prev) => !prev)}
			>
				menu
			</button>
			<div
				className={`h-screen flex flex-col gap-3 transition-all ${open ? "translate-x-0" : "translate-x-[-100%]"} bg-neutral-900/50 absolute top-0 w-[250px]`}
			>
				<ul className="mx-8 mt-20 gap-3 flex flex-col">
					{hooksLearnt.map((hook) => (
						<li key={hook}>
							<Link
								className={`${darkThemeTextClass} text-neutral-100 ${pathname.includes(hook.split("use")[1].toLowerCase()) && "text-neutral-100"} transition-all`}
								href={`/${hook.split("use")[1].toLowerCase()}`}
							>
								{hook}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
