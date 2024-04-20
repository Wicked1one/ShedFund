"use client";

import { Api } from "@/api/api";
import Nav from "@/components/Nav";
import Spinner from "@/components/Spinner/Spinner";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Projects() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (navigator.onLine) {
			console.log();
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
		<div className="w-[90%] mx-auto">
			<Nav />
			<p className="all text-[10px] text-gray-400 mt-10 mb-5">all projects</p>

			<div className=" flex flex-col">
				{data.map((data, i) =>
					isLoading ? (
						<div key={i} className="h-[100px] w-[100px]">
							<p>Loading</p>
						</div>
					) : (
						<Link key={i + data["title"]} href="">
							<div className=" bg-gray-200 md:h-[300px] h-[250px] md:mb-10 mb-5 flex hover:cursor-pointer rounded w-full	">
								<img
									className="w-[40%] object-fit-cover"
									src={data["image"]}
									alt={""}
								/>
								<div className="details flex flex-col justify-center  ml-10 mt-1 px-1">
									<p className="title md:text-3xl text-title text-gray-500 font-medium">
										{data["title"]}
									</p>
									<p className="address font-light text-small">
										{data["address"]}
									</p>
								</div>
							</div>
						</Link>
					)
				)}
			</div>
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
