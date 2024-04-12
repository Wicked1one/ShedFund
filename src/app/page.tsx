import React from "react";
import Image from "next/image";

export default function Home() {
	return (
		<div>
			<div className="nav flex justify-between py-5 ">
				<div className="log flex items-center">
					<Image src="/assets/logo.svg" alt="" width={25} height={25} />
					<p className="title">ShedFnd</p>
				</div>
				<div className="log flex items center  gap-x-5r">
					<Image src="/assets/wallet.svg" alt="" width={25} height={25} />
					<Image src="/assets/menu.svg" alt="" width={25} height={25} />
				</div>
			</div>
		</div>
	);
}
