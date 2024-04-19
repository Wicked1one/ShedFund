"use client";

import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import React from "react";
import Image from "next/image";

import Newsletter from "@/components/Newsletter";

export default function Home() {
	return (
		<div>
			<div className="w-[90%] mx-auto">
				<Nav />

				<Hero isHome={true} />
			</div>

			<div className="text-center">
				<p className="header text-center mt-20 mb-2 text-small text-amber-400	">
					FUNDRAISERS
				</p>
				<p className="featureTitle text-2xl font-bold text-gray-700">
					Listed projects for fundraising
				</p>
				<p className="featureSubtitle text-md">
					Our goal is to create a space that will allow you to manage your
					collection in the most efficient and effective way.
				</p>
			</div>

			<Newsletter />

			<div className="footer mt-20 flex flex-col items-center justify-center">
				<div className="log flex items-center w-full lg:pl-20 pl-5">
					<p className="title font-bold">ShedFunding</p>
					<Image src="/assets/logo.svg" alt="" width={30} height={30} />
				</div>
				<p className="text-smaller"> ShedFunding. 2024. XRPL PROJECT</p>
			</div>
		</div>
	);
}
