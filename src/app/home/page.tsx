"use client";

import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Image from "next/image";
import { navStoreModel } from "@/store";
import React from "react";
import { inputfields } from "@/data";
import Newsletter from "@/components/Newsletter";

export default function Home() {
	const isNavOpen = navStoreModel((state) => state.isNavOpen);
	return (
		<div>
			<div className="w-[90%] mx-auto">
				<Nav />
				<div
					className={`navLinks ${
						isNavOpen ? "h-[max-content]" : "h-[0] "
					}  overflow-hidden transition ease-in-out delay-5000 w-full flex flex-col items-end justify-center`}
				>
					<p className="link hover:cursor-pointer text-small mb-3">
						Create project
					</p>
					<p className="link hover:cursor-pointer text-small">All projects</p>
				</div>
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

			<Newsletter />

			<div className="footer mt-20 flex flex-col items-center justify-center">
				<div className="log flex items-center w-full lg:pl-20 pl-5">
					<p className="title font-bold">ShedFunding</p>
					<Image src="/assets/logo.svg" alt="" width={30} height={30} />
				</div>
				<p className="text-smaller"> ShedFunding. 2024. XRPL PROJECT</p>
			</div>
		</div>
	);
}
