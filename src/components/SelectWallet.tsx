import { modalState, walletAddress } from "@/store";
import React, { useState } from "react";
import { IoClipboardOutline, IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function SelectWallet() {
	// // const xumm = modalState((state) => state.xumm);
	// const wallets = [
	// 	{
	// 		title: "Xaman",
	// 		icon: "/assets/xamanLogo.jpeg",
	// 		disabled: false,
	// 		onclick: () => {
	// 			xumm.authorize();
	// 		},
	// 	},
	// 	{
	// 		title: "Coinbase Wallet",
	// 		icon: "/assets/coinbase.svg",
	// 		disabled: true,
	// 		onclick: () => {},
	// 	},
	// ];

	const [walletDetail, setWalletDetails] = useState({
		secret: "",
		address: "",
	});

	function handleDetals(e: any) {
		const { name, value } = e.target;

		setWalletDetails({
			...walletDetail,
			[name]: value,
		});
	}
	const walletDetails = [
		{ label: "secret", name: "secret" },
		{ label: "rAddress", name: "address" },
	];
	return (
		<div className="wallets bg-black p-3 w-full h-[50%]  ">
			<div className="walletHeader flex justify-center relative">
				<div className="walletHeaderText flex flex-col w-full text-center md:text-start mb-3 ">
					<p className="whTitle text-white text-center text-small">
						Connect Wallet
					</p>
					<p className="whSubtitle text-center font-thin text-gray-300 text-[10px]">
						Connect wallet to sign in
					</p>

					<p className="disc text-white text-small mt-5 text-center">
						shed-funding is still in development on the xrp test-network. users
						are adviced to follow the{" "}
						<a
							className="text-amber-500"
							href="https://xrpl.org/resources/dev-tools/xrp-faucets/"
						>
							link to xrp faucet
						</a>
						, to get an xrp testnet account to allow you test our services. you
						can also setup an xrp testnet wallet to view you transactions using{" "}
						{""}
						<a className="text-amber-500" href="https://test.xrptoolkit.com/">
							Xrp-toolkit
						</a>
						. The experience will change once we move to the mainnet
					</p>
				</div>

				<IoClose
					onClick={() => {
						modalState.setState({ isModalOpen: false, modalType: "" });
					}}
					className=" absolute right-0"
					color="white"
					size={20}
				/>
			</div>
			<div className="walletIcons  flex flex-col justify-center">
				{walletDetails.map((wallet, index) => (
					<div
						key={index + Math.random()}
						className={`w-full cursor-pointer flex gap-x-5 rounded-lg items-center  justify-center pl-2 py-2 `}
					>
						{/* <img src={wallet.icon} alt="" width={30} height={30} />
						<p
							className={`text-[11px] w-[80%] flex ml-3 font-medium mt-1 ${
								wallet.disabled ? "text-gray-500 " : "text-white"
							}`}
						>
							{wallet.title}
							{wallet.disabled && (
								<span className="ml-auto text-rose-500 text-[9px]">
									coming soon
								</span>
							)}
						</p> */}

						<div className="w-full">
							<label
								className="text-white block text-small"
								htmlFor={wallet.label}
							>
								{wallet.label}
							</label>
							<input
								id={wallet.label}
								name={wallet.name}
								onChange={handleDetals}
								className="w-full bg-gray-600 rounded p-1 text-small text-white"
								value={
									wallet.name == "address"
										? walletDetail.address
										: walletDetail.secret
								}
								type="text"
							/>
						</div>
						<IoClipboardOutline
							color="white"
							onClick={async () => {
								const value = await navigator.clipboard.readText();
								setWalletDetails({
									...walletDetail,
									[wallet.name]: value,
								});
								// Set the value of input field directly
								const addressInput = document.getElementById(
									wallet.label
								) as HTMLInputElement;
								if (addressInput) {
									addressInput.value = value;
								}
							}}
						/>
					</div>
				))}
				<button
					onClick={() => {
						console.log({ walletDetail });
						try {
							if (
								walletDetail.address.length > 0 &&
								walletDetail.secret.length > 0
							) {
								Cookies.set("walletSecret", walletDetail.secret);
								Cookies.set("walletAddress", walletDetail.address);
								walletAddress.setState({ walletAddress: walletDetail.address });
								modalState.setState({ isModalOpen: false, modalType: "" });
								toast.success("Wallet imported successfully");
							} else {
								toast.error("Failed: Wallet fields cannot be empty ");
							}
						} catch (err) {
							toast.error("Wallet imported failed");
						}
					}}
					className="w-full py-2 mt-10 align-self-end bg-amber-500 rounded text-white"
				>
					import wallet
				</button>
			</div>
		</div>
	);
}
