import React from "react";

export default function Hero() {
	return (
		<div className=" w-full h-70vh mx-auto mt-20 flex flex-col items-center justify-center rounded hero bg-[url('/assets/hero.svg')] bg-no-repeat bg-cover">
			<p className="titl text-3xl font-bold">Submit your project</p>
			<p className="titl">SGet Funding without fees</p>
		</div>
	);
}
