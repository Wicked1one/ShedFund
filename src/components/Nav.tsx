"use client";
import "dotenv/config.js";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
	modalState,
	navStoreModel,
	walletAddress,
	walletBalance,
} from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Cookies from "js-cookie";
import { fetchWalletBalance } from "@/utils";

export default function Nav() {
	const pathname = usePathname();
	const cAddress = walletAddress((state) => state.walletAddress);
	// var xumm = new Xumm(
	// 	"ca9819b9-4b01-41ba-9716-ad7844d1b0e1",
	// 	"fe90fc1b-553a-4769-8979-9b5749803e47"
	// );
	const address = Cookies.get("walletAddress");
	const [IsBalanceIsLoading, setIsBalanceIsLoading] = useState(false);
	const [balance, setBalance] = useState("");
	const Balance = walletBalance((state) => state.walletBalance);

	useEffect(() => {
		navStoreModel.setState({ isNavOpen: false });
		modalState.setState({ isModalOpen: false, modalType: "" });

		// check if we have and address in cache and populate
		address && walletAddress.setState({ walletAddress: address });

		// fetch wallet balance of use and add it to balance state

		const balance = fetchWalletBalance(
			address!,
			setIsBalanceIsLoading,
			setBalance
		);
		console.log(balance);
		walletBalance.setState({ walletBalance: balance! });

		// connectWallet();
	}, [pathname, address]);

	// async function connectWallet() {
	// 	xumm.on("ready", () =>
	// 		console.log("Ready (e.g. hide loading state of page)")
	// 	);

	// 	xumm.on("success", async () => {
	// 		xumm.user.account.then((account) => {
	// 			modalState.setState({ isModalOpen: false, modalType: "" });
	// 			Cookies.set("walletAddress", account!);
	// 			console.log("COnnected");
	// 			setAddress(account!);
	// 		});
	// 	});
	// }

	const isNavOpen = navStoreModel((state) => state.isNavOpen);

	return (
		<div>
			<div className={`nav flex justify-between py-5 `}>
				<div className="log flex items-center">
					<Link href={"/"}>
						<p className="title font-bold md:text-[15px] text-small">
							ShedFunding
						</p>
					</Link>
					<Image src="/assets/logo.svg" alt="" width={25} height={25} />
				</div>
				<div className="log w-[55%] flex items-center justify-end  gap-x-5">
					{cAddress ? (
						<div className="overflow-x-hidden md:flex items-center gap-x-2  justify-self-end">
							<p className="text-[12px] items-center text-gray-400">
								{cAddress}
							</p>
							<div className="md:block flex items-center text-[10px]">
								{Balance && <p className="text-black">bal : {Balance}</p>}
								<button
									onClick={async () => {
										try {
											console.log("Logout button clicked");
											console.log("Logout completed");
											Cookies.remove("walletAddress");
											Cookies.remove("walletSecret");
											walletAddress.setState({ walletAddress: "" });
										} catch (error) {
											console.error("Error during logout:", error);
										}
									}}
									className="text-[10px] bg-amber-500 cursor-pointer rounded p-1 text-white"
								>
									Disconnect
								</button>
							</div>
						</div>
					) : (
						<Image
							onClick={() => {
								modalState.setState({
									isModalOpen: true,
									modalType: "wallet",
								});
							}}
							src="/assets/wallet.svg"
							alt=""
							width={20}
							height={20}
						/>
					)}
					<Image
						onClick={() =>
							navStoreModel.setState({
								isNavOpen: !isNavOpen,
							})
						}
						src="/assets/menu.svg"
						alt=""
						width={20}
						height={20}
					/>
				</div>
			</div>
			<div
				className={`navLinks ${
					isNavOpen ? "h-[max-content] transition duration-1000" : "h-[0] "
				}   w-full  overflow-hidden  flex flex-col items-end justify-center`}
			>
				<Link href="/submit-project">
					<p className="link hover:cursor-pointer text-small mb-3">
						Create project
					</p>
				</Link>
				<Link href="projects">
					<p className="link hover:cursor-pointer text-small">All projects</p>
				</Link>
			</div>
		</div>
	);
}
