import { Xumm } from "xumm";
import { create } from "zustand";

interface navState {
	isNavOpen: boolean;
}

export const navStoreModel = create<navState>((set) => ({
	isNavOpen: false,
}));
interface modalState {
	isModalOpen: boolean;
	modalType: string;
	address: string;
	xumm: any;
}

export const modalState = create<modalState>((set) => ({
	isModalOpen: false,
	modalType: "",
	address: "",
	xumm: "",
}));
interface walletAddressState {
	walletAddress: string;
	disconnect: boolean;
}

export const walletAddress = create<walletAddressState>((set) => ({
	walletAddress: "",
	disconnect: false,
}));
