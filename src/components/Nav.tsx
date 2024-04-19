"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { navStoreModel } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Nav() {
	const pathname = usePathname();
	useEffect(() => {
		navStoreModel.setState({ isNavOpen: false });
	}, []);
	const isNavOpen = navStoreModel((state) => state.isNavOpen);
	return (
		<div>
			<div className={`nav flex justify-between py-5 `}>
				<div className="log flex items-center">
					<p className="title font-bold">ShedFunding</p>
					<Image src="/assets/logo.svg" alt="" width={25} height={25} />
				</div>
				<div className="log flex items center  gap-x-5">
					<Image src="/assets/wallet.svg" alt="" width={25} height={25} />
					<Image
						onClick={() =>
							navStoreModel.setState({
								isNavOpen: !isNavOpen,
							})
						}
						src="/assets/menu.svg"
						alt=""
						width={25}
						height={25}
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
				<Link href="">
					<p className="link hover:cursor-pointer text-small">All projects</p>
				</Link>
			</div>
		</div>
	);
}