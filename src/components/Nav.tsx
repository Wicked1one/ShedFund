"use client";
import "dotenv/config.js";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { modalState, navStoreModel, walletAddress } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Xumm } from "xumm";
import Cookies from "js-cookie";

export default function Nav() {
	const pathname = usePathname();
	const cAddress = Cookies.get("walletAddress");
	var xumm = new Xumm(
		"ca9819b9-4b01-41ba-9716-ad7844d1b0e1",
		"fe90fc1b-553a-4769-8979-9b5749803e47"
	);
	const [address, setAddress] = useState("");

	useEffect(() => {
		navStoreModel.setState({ isNavOpen: false });
		modalState.setState({ isModalOpen: false, modalType: "" });
		setAddress(cAddress || "");
		connectWallet();
	}, [pathname, address]);

	async function connectWallet() {
		xumm.on("ready", () =>
			console.log("Ready (e.g. hide loading state of page)")
		);

		xumm.on("success", async () => {
			xumm.user.account.then((account) => {
				modalState.setState({ isModalOpen: false, modalType: "" });
				Cookies.set("walletAddress", account!);
				console.log("COnnected");
				setAddress(account!);
			});
		});

		xumm.on("logout", async () => {
			console.log("Logout completed");
			Cookies.remove("walletAddress");
		});
	}

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
				<div className="log w-[40%] flex items-center justify-end  gap-x-5">
					{address ? (
						<div className="overflow-x-hidden md:flex items-center gap-x-2  justify-self-end">
							<p className="text-[12px] text-gray-400">{address}</p>
							<button
								onClick={() => {
									try {
										console.log("Logout button clicked");
										setAddress("");
										xumm.logout();
										console.log(address);
									} catch (error) {
										console.error("Error during logout:", error);
									}
								}}
								className="text-[10px] bg-amber-500 cursor-pointer rounded p-1 text-white"
							>
								Disconnect
							</button>
						</div>
					) : (
						<Image
							onClick={() => {
								modalState.setState({
									isModalOpen: true,
									modalType: "wallet",
									xumm: xumm,
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
					isNavOpen ? "h-[max-content]" : "h-[0] "
				}  overflow-hidden transition ease-in-out delay-5000 w-full flex flex-col items-end justify-center`}
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
