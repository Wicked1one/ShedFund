"use client";
import "dotenv/config.js";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { navStoreModel } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Xumm } from "xumm";

export default function Nav() {
	var xumm = new Xumm(
		"ca9819b9-4b01-41ba-9716-ad7844d1b0e1",
		"fe90fc1b-553a-4769-8979-9b5749803e47"
	);

	const [connectedAccount, setConnectedAccount] = useState("");
	const pathname = usePathname();
	useEffect(() => {
		console.log(process.env.apiKey);
		navStoreModel.setState({ isNavOpen: false });
		connectWallet();
	}, [pathname]);

	const isNavOpen = navStoreModel((state) => state.isNavOpen);

	async function connectWallet() {
		console.log("Running connecgt wallet");
		xumm.on("ready", () =>
			console.log("Ready (e.g. hide loading state of page)")
		);

		xumm.on("success", async () => {
			xumm.user.account.then((account) => {
				setConnectedAccount(account!);
			});
		});

		xumm.on("logout", async () => {
			setConnectedAccount("");
		});
	}

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
				<div className="log flex items center  gap-x-5">
					{connectedAccount ? (
						<div
							className="w-[30%] overflow-x-hidden"
							onClick={() => {
								xumm.logout();
							}}
						>
							<p className="text-[12px] text-gray-400">{connectedAccount}</p>
						</div>
					) : (
						<Image
							onClick={() => {
								xumm.authorize();
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
