"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { modalState } from "@/store";
import WalletScreen from "@/components/WalletScreen/WalletScreen";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
// 	title: "Shed funding",
// 	description: "a funding application designed to help funding for projects",
// };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isWalletOpen = modalState((state) => state.isModalOpen);
	const modalType = modalState((state) => state.modalType);
	return (
		<html lang="en">
			<body className={inter.className}>
				<div>
					{isWalletOpen || modalType != "" ? <WalletScreen /> : <div></div>}
					{children}
				</div>
			</body>
		</html>
	);
}
