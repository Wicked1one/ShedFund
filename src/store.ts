import { create } from "zustand";

interface navState {
	isNavOpen: boolean;
}

export const navStoreModel = create<navState>((set) => ({
	isNavOpen: false,
}));
