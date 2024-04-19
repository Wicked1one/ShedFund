import React from "react";
import Image from "next/image";

export default function Newsletter() {
	return (
		<div className="bottom flex flex-col items-center justify-center mt-20 h-80vh bg-[url('/assets/wave.svg')] bg-no-repeat bg-cover w-full">
			<p className="font-bold text-3xl mb-2 mt-10">
				Subscribe to our newsletter
			</p>
			<p className="text-small mb-4">
				Get real time XRPL / Crypto Updates and news.
			</p>
			<input
				className="border w-2/3 p-2 mb-6 rounded placeholder:text-smaller"
				placeholder="Email"
			/>
			<button className="py-3 flex gap-2 bg-black items-center mx-auto rounded justify-center w-1/2">
				<p className="text-white">Subscribe</p>{" "}
				<Image src="/assets/btnImage.svg" alt="" width={25} height={25} />
			</button>
		</div>
	);
}
