"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Api } from "@/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "@/components/Nav";

import { IoCopyOutline } from "react-icons/io5";
import Spinner from "@/components/Spinner";
import { modalState, pageWalletBalance } from "@/store";
import { fetchWalletBalance } from "@/utils";

export default function Projecct() {
	const params = useParams();
	const walletBalance = pageWalletBalance((state) => state.walletBalance);
	const [data, setData] = useState({
		image: "",
		title: "",
		desc: "",
		address: "",
		amount: "",
		tx: [],
	});

	const [isLoading, setIsLoading] = useState(false);
	const [iBalanceLoading, setIsBalanceIsLoading] = useState(false);
	useEffect(() => {
		if (navigator.onLine) {
			setIsLoading(true);
			fetchProject();
		} else {
			// Show toast
			toast.error("You are not connected to the internet");
		}
	}, []);

	function fetchProject() {
		Api.handleFetch(`/all-projects/${params.project}`)
			.then((response) => {
				console.log(response.data);
				setIsLoading(false);
				setData(response.data);
				fetchWalletBalance(response.data.address, setIsBalanceIsLoading, true);
			})

			.catch((error) => {
				setIsLoading(false);
				console.log(error);
				toast.error("There was an error fetching projects");
			});
	}

	function calculatePercent(part: number, whole: number) {
		if (whole !== 0) {
			const percentage = (part / whole) * 100;

			return (
				<div className=" flex flex-col md:w-[80%] w-[75%]">
					{iBalanceLoading ? (
						<div className="h-[30px] flex items-center justify-center w-[50%]">
							<Spinner isloading={isLoading}></Spinner>
						</div>
					) : (
						<div className=" overflow-x-hidden rounded h-[10px] w-full bg-gray-200">
							<div
								style={{
									width: `${percentage}%`,
								}}
								className={`inner rounded h-[10px] bg-amber-500 rounded`}
							></div>
						</div>
					)}
					<div className="flex justify-between">
						<p className="address  text-small text-gray-400">{part || ""}</p>

						<p className="address text-small text-gray-400">{whole || ""}</p>
					</div>
				</div>
			);
		}
	}
	return (
		<div className="w-[95%] mx-auto">
			<ToastContainer />
			<Nav />
			{isLoading ? (
				<div className="h-[500px] flex items-center justify-center w-full">
					<Spinner isloading={isLoading}></Spinner>
				</div>
			) : (
				<div className="project flex md:flex-row flex-col">
					<div className="md:w-[60%] w-full md:h-[90vh] h-[50vh] flex mr-5">
						<img
							className="object-cover w-full object-top"
							src={data.image}
							alt=""
						/>
					</div>
					<div className="desc md:w-[40%] w-full flex flex-col pb-5 ">
						<p className="tit mt-10 text-3xl text-gray-400 font-medium">
							{data.title}
						</p>
						<div className="flex mt-5 justify-between md:flex-row flex-col md:items-center items-start ">
							<div className="flex items-center gap-x-5 mb-5">
								<p className="address text-small font-medium md:mb-0 mb-2">
									XRP address:{" "}
									<span className="text-gray-400 text-rose-500">
										{data.address}{" "}
									</span>
								</p>
								<span>
									<IoCopyOutline
										size={20}
										onClick={() => {
											navigator.clipboard.writeText(data.address);
											toast.success("address copied to clipboard");
										}}
									/>
								</span>
							</div>
						</div>
						{calculatePercent(
							Number.parseInt(walletBalance),
							Number.parseInt(data.amount.replace(/,/g, ""))
						)}
						<p className="mt-5 text-small">{data.desc}</p>

						<button
							onClick={() => {
								console.log({ addresses: data.address });
								modalState.setState({
									modalType: "fund",
									address: data.address,
									id: params.project,
								});
							}}
							className="alig py-2 mt-20 align-self-end bg-amber-500 rounded text-white"
						>
							Fund
						</button>
					</div>
				</div>
			)}
			<div className="mt-10 pb-5">
				<p className="text-gray-400 text-[10px]">Transactions</p>
				{data.tx.length > 0 &&
					data.tx.map((tx, i) => (
						<div key={i + Math.random()} className="my-3">
							<p className="text-[10px] text-green-500">Success</p>
							<div className="flex w-full items-center justify-between">
								<div>
									<p className="text-[12px]">Account</p>
									<p className="text-[10px] text-gray-400">{tx["Account"]}</p>
								</div>
								<div>
									<p className="text-[12px]">amount</p>
									<p className=" text-[12px] text-amber-800">
										{tx["Amount"]} drops
									</p>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
