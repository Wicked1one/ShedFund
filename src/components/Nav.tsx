import React from "react";
import Image from "next/image";
export default function Nav() {
	return (
		<div className="nav flex justify-between py-5 ">
			<div className="log flex items-center">
				<p className="title font-bold">ShedFunding</p>
				<Image src="/assets/logo.svg" alt="" width={25} height={25} />
			</div>
			<div className="log flex items center  gap-x-5">
				<Image src="/assets/wallet.svg" alt="" width={25} height={25} />
				<Image src="/assets/menu.svg" alt="" width={25} height={25} />
			</div>
		</div>
	);
}
