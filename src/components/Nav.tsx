"use client";
import React from "react";
import Image from "next/image";
import { navStoreModel } from "@/store";
export default function Nav() {
	const isNavOpen = navStoreModel((state) => state.isNavOpen);
	return (
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
	);
}
