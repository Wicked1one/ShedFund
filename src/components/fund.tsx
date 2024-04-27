import { modalState } from "@/store";
import React from "react";

import { IoClose } from "react-icons/io5";

export default function fund() {
	return (
		<div className=" bg-black p-3 w-full h-[40%] md:w-[500px]  w-full  ">
			<div className="walletHeader flex justify-center relative">
				<div className="walletHeaderText flex flex-col w-4/5 text-center md:text-start ">
					<p className="whTitle text-white text-center text-medium">Donate</p>
				</div>

				<IoClose
					onClick={() => {
						modalState.setState({ isModalOpen: false, modalType: "" });
					}}
					className=" absolute right-0"
					color="white"
					size={20}
				/>
			</div>
			<div className="mt-5">
				<div className="mb-2">
					<label className="block mb-1 text-white text-small" htmlFor="">
						receipient adress
					</label>
					<input
						className="border bg-gray-600 w-full p-2 rounded placeholder:text-smaller"
						placeholder="address"
						name="rAddress"
					/>
				</div>
				<div className="">
					<label className="block mb-1 text-white text-small" htmlFor="">
						amount in XRP
					</label>
					<input
						className="border w-full bg-gray-600 p-2 rounded placeholder:text-smaller"
						placeholder="how much XRP are you donating"
						name="rAddress"
						type="number"
					/>
				</div>
			</div>

			<button
				onClick={() => {}}
				className="w-full py-2 mt-10 align-self-end bg-amber-500 rounded text-white"
			>
				Fund
			</button>
		</div>
	);
}
