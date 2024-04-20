"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Api } from "@/api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "@/components/Nav";
import Image from "next/image";

export default function Projecct() {
	const params = useParams();

	interface dataProps {
		title: string;
		image: string;
		desc: string;
		address: string;
	}
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		console.log(params);
		if (navigator.onLine) {
			setIsLoading(true);
			Api.handleFetch(`/all-projects/${params.project}`)
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

	function calculatePercent(part: number, whole: number) {
		if (whole !== 0) {
			const percentage = (part / whole) * 100;
			console.log(percentage);
			return (
				<div className=" flex flex-col">
					<div className="address rounded h-[10px] w-[150px] bg-gray-200">
						<div
							style={{
								width: `${percentage}%`,
							}}
							className={`inner rounded h-[10px] bg-amber-500`}
						></div>
					</div>
					<div className="flex justify-between">
						<p className="address  text-small text-gray-400">{part}</p>
						<p className="address text-small text-gray-400">{whole}</p>
					</div>
				</div>
			);
		}
	}
	return (
		<div className="w-[95%] mx-auto">
			<Nav />
			<div className="project flex md:flex-row flex-col">
				<div className="md:w-[60%] w-full md:h-[90vh] h-[50vh] flex mr-5">
					<img
						className="object-cover object-top"
						src={data!["image"]}
						alt=""
					/>
				</div>
				<div className="desc md:w-[40%] w-full flex flex-col pb-5 ">
					<p className="tit mt-10 text-3xl text-gray-400 font-medium">
						{data!["title"]}
					</p>
					<div className="flex mt-5 justify-between md:flex-row flex-col md:items-center items-start ">
						<p className="address text-small font-medium md:mb-0 mb-2">
							XRP address:{" "}
							<span className="text-gray-400">{data!["address"]}</span>
						</p>
						{calculatePercent(1000, Number.parseInt(data!["amount"]))}
					</div>
					<p className="mt-5 text-small">{data!["desc"]}</p>

					<button className="alig py-2 mt-20 align-self-end bg-amber-500 rounded text-white">
						Fund
					</button>
				</div>
			</div>
		</div>
	);
}
