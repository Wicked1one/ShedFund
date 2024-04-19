import React from "react";
import Image from "next/image";

interface props {
	isHome?: boolean;
}

export default function Hero({ isHome }: props) {
	return (
		<div
			className={`w-full h-70vh mx-auto mt-5 rounded hero ${
				!isHome ? "bg-[url('/assets/hero.svg')]" : "bg-[#F4EFE9]"
			} bg-no-repeat bg-cover`}
		>
			{isHome ? (
				<div className="flex items-center h-full px-5">
					<div className="header w-[70%] mr-10">
						<p className="hTitle text-3xl mb-2 text-gray-500 font-bold">
							"Empower Dreams, Fund Change: Where Every Contribution Writes a
							Story of Impact!"
						</p>
						<p className="hsubTitle text-gray-500 text-small">
							"Transforming Ideas into Reality, One Donation at a Time!"
						</p>
					</div>
					<div className="h-[90%] flex">
						<img
							className="object-cover"
							src="/assets/runningkids.jpeg"
							alt=""
						/>
					</div>
				</div>
			) : (
				<div className="flex h-full flex-col items-center justify-center">
					<p className="titl text-3xl font-bold">Submit your project</p>
					<p className="titl">Get Funding without fees</p>
				</div>
			)}
		</div>
	);
}
