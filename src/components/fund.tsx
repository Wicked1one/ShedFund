import { Api } from "@/api/api";
import { modalState } from "@/store";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner";

export default function Fund() {
	const fundTo = modalState((state) => state.address);
	const address = Cookies.get("walletAddress");
	const secret = Cookies.get("walletSecret");
	const [isLoading, setIsLoading] = useState(false);
	const [fundData, setFundData] = useState({
		fundTo: fundTo,
		amount: "",
		address: address,
		secret: secret,
	});

	function fund() {
		if (navigator.onLine) {
			if (address) {
				setIsLoading(true);
				if (fundData.address != "")
					fundData.address != "" &&
						Api.handlePost("/fund", fundData, {
							ContentType: "application/json",
						})
							.then((res) => {
								console.log(res);

								modalState.setState({ isModalOpen: false, modalType: "" });
								toast.success("funded sucessfully");
								setIsLoading(false);
							})
							.catch((err) => {
								console.log(err);
								setIsLoading(false);
								toast.success(
									"someethign went wrong when attempting to fund project"
								);
							});
			} else {
				setIsLoading(false);
				toast.error("Your wallet is not connected to the application");
			}
		} else {
			setIsLoading(false);
			toast.error("you are not connected to the internet");
		}
	}
	return (
		<div className="h-full bg-transparent flex items-center justify-center w-full">
			<ToastContainer />
			<div className=" bg-black p-3 w-full h-[45%] md:w-[500px]  w-full  ">
				{isLoading ? (
					<div className="h-[500px] flex items-center justify-center w-full">
						<Spinner isloading={isLoading}></Spinner>
					</div>
				) : (
					<div className="">
						<div className="walletHeader flex justify-center relative">
							<div className="walletHeaderText flex flex-col w-4/5 text-center md:text-start ">
								<p className="whTitle text-white text-center text-medium">
									Donate
								</p>
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
									className="border text-white bg-gray-600 w-full p-2 rounded placeholder:text-smaller"
									placeholder="address"
									name="rAddress"
									defaultValue={fundTo || ""}
								/>
							</div>
							<div className="">
								<label className="block mb-1 text-white text-small" htmlFor="">
									amount in XRP
								</label>
								<input
									className="border text-white w-full bg-gray-600 p-2 rounded placeholder:text-smaller"
									placeholder="how much XRP are you donating"
									name="rAddress"
									type="number"
									onChange={(e) => {
										setFundData({
											...fundData,
											amount: e.target.value,
										});
									}}
								/>
							</div>
						</div>
						<button
							onClick={() => {
								fund();
								console.log(fundData);
							}}
							className="w-full py-2 mt-10 align-self-end bg-amber-500 rounded text-white"
						>
							{isLoading ? <Spinner isloading={isLoading} /> : "Fund"}
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
