"use client";

import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";

import Newsletter from "@/components/Newsletter";
import { Api } from "@/api/api";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "@/components/Spinner";

export default function Home() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (navigator.onLine) {
			setIsLoading(true);
			Api.handleFetch("/all-projects")
				.then((response) => {
					console.log(response);
					setIsLoading(false);
					setData(response.data);
				})
				.catch((error) => {
					setIsLoading(false);
					console.log(error);
					toast.error("There was an error fetching projects");
				});
		} else {
			// Show toast
			toast.error("You are not connected to the internet");
		}
	}, []);
	return (
		<div>
			<div className="w-[90%] mx-auto">
				<Nav />
				<ToastContainer />
				<Hero isHome={true} />
			</div>

			<div className="text-center md:px-0 px-2">
				<p className="header text-center mt-20 mb-2 text-small text-amber-600	">
					FUNDRAISERS
				</p>
				<p className="featureTitle md:text-2xl text-title font-bold text-gray-700">
					Listed projects for fundraising
				</p>
				<p className="featureSubtitle md:text-md text-small">
					Our goal is to create a space that will allow you to manage your
					collection in the most efficient and effective way.
				</p>
			</div>

			{!isLoading && (
				<Link href="/projects">
					<p className="seeMore w-[95%] mx-auto text-end text-[10px] text-amber-600 pr-5 hover:cursor-pointer  mt-10 mb-5">
						{" "}
						See more
					</p>
				</Link>
			)}
			<div className="flex md:flex-row flex-col gap-5 justify-center  px-3 flex-wrap">
				{isLoading ? (
					<div className="h-[500px] mt-10 flex items-center justify-center w-full">
						<Spinner isloading={isLoading}></Spinner>
					</div>
				) : !isLoading && data.length == 0 ? (
					<div>nodata was found</div>
				) : (
					data.map((data, i) =>
						i <= 7 ? (
							<Link
								key={i + data["title"]}
								className="md:w-[30%] w-full h-[300px]"
								href={`/projects/${data["_id"]}`}
							>
								<div className=" bg-slate-50 hover:cursor-pointer rounded flex flex-col	">
									<img
										className="h-[200px] w-full object-cover object-top"
										src={data["image"]}
										alt={""}
									/>
									<div className="details mt-1 px-1">
										<p className="title text-title text-gray-500 font-medium">
											{data["title"]}
										</p>
										<p className="address font-light text-small">
											{data["address"]}
										</p>
									</div>
								</div>
							</Link>
						) : (
							<div key={i}></div>
						)
					)
				)}
			</div>

			<Newsletter />

			<div className="footer mt-20 flex flex-col items-center justify-center">
				<div className="log flex items-center w-full md:pl-20 pl-2">
					<p className="title md:font-bold font-medium">ShedFunding</p>
					<Image src="/assets/logo.svg" alt="" width={30} height={30} />
				</div>
				<p className="text-smaller md:mt-0 mt-5">
					{" "}
					ShedFunding. 2024. XRPL PROJECT
				</p>
			</div>
		</div>
	);
}
