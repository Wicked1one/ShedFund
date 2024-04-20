"use client";

import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Image from "next/image";
import React, { useState } from "react";
import { inputfields } from "@/data";
import Newsletter from "@/components/Newsletter";
import { Api } from "@/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Submit() {
	const [project, setProject] = useState({
		title: "",
		image: "",
		desc: "",
		address: "",
		amount: "",
	});

	const [imgUrl, setImgUrl] = useState("");
	const [isLoading, setIsloading] = useState(false);

	function handleChange(e: any) {
		const { name, value } = e.target;
		if (name === "image") {
			if (e.target.files.length > 0) {
				setImgUrl(URL.createObjectURL(e.target.files[0]));
			}
			setProject({
				...project,
				image: e.target.files[0],
			});
		} else {
			setProject({
				...project,
				[name]: value,
			});
		}
	}

	async function submitProject() {
		if (navigator.onLine) {
			if (Api.handleFieldCheck(project) == false) {
				return;
			}

			setIsloading(true);
			await Api.handlePost("/register-project", project)
				.then((response) => {
					setIsloading(false);
					toast.success(
						`Successfully added ${response.data.title} as a new project`
					);
					setProject({
						title: "",
						image: "",
						desc: "",
						address: "",
						amount: "",
					});
					setImgUrl("");
				})
				.catch((err) => {
					setIsloading(false);
					console.log(err);
					toast.error(err);
				});
		} else {
			toast.error("You are not connected to the internet");
		}
	}
	return (
		<div>
			<ToastContainer />
			<div className="w-[90%] mx-auto">
				<Nav />
				<Hero />
				<div className="imageadd mt-10">
					<div className="header flex gap-x-2">
						<Image src="/assets/attach.svg" height={20} width={20} alt="" />
						<p className="text-sm">Upload image file</p>
					</div>
					<label
						className="hover:cursor-pointer w-[max-content] bg-black"
						htmlFor="picker"
					>
						{imgUrl ? (
							<Image
								className="mt-2 "
								src={imgUrl}
								height={100}
								width={100}
								alt=""
							/>
						) : (
							<Image
								className="mt-2 "
								src="/assets/image.svg"
								height={25}
								width={25}
								alt=""
							/>
						)}
						<input
							type="file"
							id="picker"
							className="hidden"
							name="image"
							accept="image/*"
							onChange={handleChange}
						/>
					</label>
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
									name={field.name}
									id=""
									cols={30}
									onChange={handleChange}
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
									name={field.name}
									onChange={handleChange}
								/>
							</div>
						);
					})}
				</div>
				<button
					onClick={submitProject}
					className="py-3 flex mt-20 gap-2 bg-black items-center rounded justify-center w-full"
				>
					<p className="text-white">
						{isLoading ? "Submitting project" : "Create"}
					</p>{" "}
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
