import React from "react";

interface props {
	isHome?: boolean;
}

export default function Hero({ isHome }: props) {
	return (
		<div
			className={`w-full md:h-70vh h-[50vh] mx-auto mt-5 rounded hero ${
				!isHome ? "bg-[url('/assets/hero.svg')]" : "bg-[#F4EFE9]"
			} bg-no-repeat bg-cover`}
		>
			{isHome ? (
				<div className="flex flex-col md:flex-row items-center h-full px-5">
					<div className="header md:w-[70%] w-full mr-10">
						<p className="hTitle md:text-3xl text-title md:text-start text-center mb-2 text-gray-500 font-bold">
							Empower Dreams, Fund Change: Where Every Contribution Writes a
							Story of Impact!
						</p>
						<p className="hsubTitle md:text-start text-center text-gray-500 text-small">
							Transforming Ideas into Reality, One Donation at a Time!
						</p>
					</div>
					<div className="md:h-[90%] h-[50%] flex">
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
