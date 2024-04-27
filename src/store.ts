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
}

export const modalState = create<modalState>((set) => ({
	isModalOpen: false,
	modalType: "",
	address: "",
}));
interface walletAddressState {
	walletAddress: string;
	disconnect: boolean;
}

export const walletAddress = create<walletAddressState>((set) => ({
	walletAddress: "",
	disconnect: false,
}));
