import Link from "next/link";
import { hooksLearnt } from "./constants";

export default function Home() {
	return (
		<div className="h-screen dark flex items-center justify-center w-full">
			<div className="flex flex-col gap-4 p-6 rounded-md">
				<h1 className=" text-[25px] font-bold">Hooks I have learnt till now</h1>
				<ul className="flex flex-col  items-end gap-2">
					{hooksLearnt.map((hook) => (
						<Link
							className="text-neutral-500 hover:text-neutral-100 transition-all"
							href={`/${hook.split("use")[1].toLowerCase()}`}
							key={hook}
						>
							{hook}
						</Link>
					))}
				</ul>
				<a
					href="https://github.com/DMZTdhruv"
					target="_blank"
					rel="noreferrer"
					className="mt-4 w-fit text-neutral-700 hover:text-neutral-100"
				>
					Github repo.
				</a>
			</div>
		</div>
	);
}
