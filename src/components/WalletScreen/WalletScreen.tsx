import React, { useEffect } from "react";
import "./WalletScreen.css";
import SelectWallet from "../SelectWallet";
import { modalState } from "@/store";
import Fund from "../fund";

function WalletScreen() {
	const modalType = modalState((state) => state.modalType);
	return (
		<div
			style={{
				backgroundColor: "rgba(16, 24, 39, 0.8)",
				width: "100%",
			}}
			className="h-full w-full z-10 left-0 top-0 flex items-center fixed justify-center"
		>
			{modalType == "wallet" ? (
				<SelectWallet />
			) : modalType == "fund" ? (
				<Fund />
			) : (
				<div></div>
			)}
		</div>
	);
}

export default WalletScreen;
