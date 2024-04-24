"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { navStoreModel } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Xumm } from "xumm";
import "dotenv/config";

export default function Nav() {
	var xumm = new Xumm(
		"ca9819b9-4b01-41ba-9716-ad7844d1b0e1",
		"d4763fc0-99c0-4a1f-9b07-cb49e9249e62"
	);

	const [connectedAccount, setConnectedAccount] = useState("");
	const pathname = usePathname();
	useEffect(() => {
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
							onClick={() => {
								xumm.logout();
							}}
						>
							<p>{connectedAccount}</p>
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
