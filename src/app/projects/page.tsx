"use client";

import { Api } from "@/api/api";
import Nav from "@/components/Nav";
import Spinner from "@/components/Spinner";

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
				{isLoading ? (
					<div className="h-[500px] flex items-center justify-center w-full">
						<Spinner isloading={isLoading}></Spinner>
					</div>
				) : data.length < 1 ? (
					<div></div>
				) : (
					data.map((data, i) => (
						<Link key={i + data["title"]} href={`/projects/${data["_id"]}`}>
							<div className=" bg-gray-200 md:h-[300px] h-[200px] md:mb-10 mb-5 flex hover:cursor-pointer rounded w-full	">
								<img
									className="md:w-[40%] w-[50%] object-fit-cover"
									src={data["image"]}
									alt={""}
								/>
								<div className="details flex flex-col md:justify-center  md:ml-10 ml-3 mt-1 px-1">
									<p className="title md:text-3xl text-[14px] text-gray-500 md:font-medium font-bold md:mt-0 mt-10">
										{data["title"]}
									</p>
									<p className="address font-light md:text-small md:w-full w-[100px] overflow-x-hidden  text-[8px]">
										{data["address"]}
									</p>
								</div>
							</div>
						</Link>
					))
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
