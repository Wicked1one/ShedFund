import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import React from "react";
import Image from "next/image";
import { inputfields } from "@/data";

export default function Home() {
	return (
		<div>
			<div className="container w-3/4 mx-auto">
				<Nav />
				<Hero />
				<div className="imageadd mt-10">
					<div className="header flex gap-x-2">
						<Image src="/assets/attach.svg" height={20} width={20} alt="" />
						<p className="text-sm">Upload image file</p>
					</div>
					<Image
						className="mt-2"
						src="/assets/image.svg"
						height={25}
						width={25}
						alt=""
					/>
				</div>
				<div className="inputfield mt-10">
					{inputfields.map((field) => {
						return field.isTextArea ? (
							<div className="mb-10">
								<label className="block mb-3 text-small" htmlFor="">
									{field.title}
								</label>
								<textarea
									className=" border w-full px-5 rounded placeholder:text-smaller"
									placeholder={field.placeholder}
									name=""
									id=""
									cols={30}
									rows={10}
								></textarea>
							</div>
						) : (
							<div className="mb-10">
								<label className="block mb-3  text-small" htmlFor="">
									{field.title}
								</label>
								<input
									className="border w-full p-2 rounded placeholder:text-smaller"
									placeholder={field.placeholder}
								/>
							</div>
						);
					})}
				</div>
				<button className="py-3 flex mt-20 gap-2 bg-black items-center rounded justify-center w-full">
					<p className="text-white">Create</p>{" "}
					<Image src="/assets/btnImage.svg" alt="" width={25} height={25} />
				</button>
			</div>

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

			<div className="footer mt-20 flex flex-col items-center justify-center">
				<div className="log flex items-center w-full pl-20">
					<p className="title font-bold">ShedFunding</p>
					<Image src="/assets/logo.svg" alt="" width={30} height={30} />
				</div>
				<p> ShedFunding. 2024. XRPL PROJECT</p>
			</div>
		</div>
	);
}
