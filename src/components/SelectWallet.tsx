import { modalState, walletAddress } from "@/store";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Xumm } from "xumm";
import Cookies from "js-cookie";

export default function SelectWallet() {
	var xumm = new Xumm(
		"ca9819b9-4b01-41ba-9716-ad7844d1b0e1",
		"fe90fc1b-553a-4769-8979-9b5749803e47"
	);

	useEffect(() => {
		connectWallet();
	});
	async function connectWallet() {
		console.log("Running connecgt wallet");
		xumm.on("ready", () =>
			console.log("Ready (e.g. hide loading state of page)")
		);

		xumm.on("success", async () => {
			xumm.user.token.then((account) => {
				walletAddress.setState({ walletAddress: account! });
				modalState.setState({ isModalOpen: false });
				Cookies.set("walletAddress", account!);
			});
		});

		xumm.on("logout", async () => {
			walletAddress.setState({ walletAddress: "" });
			Cookies.remove("walletAddress");
		});
	}
	const wallets = [
		{
			title: "Xaman",
			icon: "/assets/xamanLogo.jpeg",
			disabled: false,
			onclick: () => {
				xumm.authorize();
			},
		},
		{
			title: "Coinbase Wallet",
			icon: "/assets/coinbase.svg",
			disabled: true,
			onclick: () => {
				xumm.authorize();
			},
		},
	];
	return (
		<div className="wallets bg-black p-3 w-full h-[50%]  ">
			<div className="walletHeader flex justify-center relative">
				<div className="walletHeaderText flex flex-col w-4/5 text-center md:text-start ">
					<p className="whTitle text-white text-center text-small">
						Connect Wallet
					</p>
					<p className="whSubtitle text-center font-thin text-gray-300 text-[10px]">
						Connect wallet to sign in
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
			<div className="walletIcons md:h-4/5  flex flex-col justify-center  mt-5">
				{wallets.map((wallet, index) => (
					<div
						key={index + Math.random()}
						onClick={() => {
							!wallet.disabled && wallet.onclick();
						}}
						aria-disabled={wallet.disabled}
						className={`w-full cursor-pointer flex rounded-lg items-center  pl-2 py-2  mb-4 ${
							wallet.disabled ? "bg-gray-900" : "bg-gray-600"
						}`}
					>
						<img src={wallet.icon} alt="" width={30} height={30} />
						<p
							className={`text-[11px] w-[80%] flex ml-3 font-medium mt-1 ${
								wallet.disabled ? "text-gray-500 " : "text-white"
							}`}
						>
							{wallet.title}
							{wallet.disabled && (
								<span className="ml-auto text-rose-500 text-[9px]">
									coming soon
								</span>
							)}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
