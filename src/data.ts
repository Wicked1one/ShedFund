export const inputfields = [
	{
		title: "Project",
		placeholder: "Name of your project",
		isTextArea: false,
		name: "title",
	},
	{
		title: "Description",
		placeholder: "Detailed description of your project",
		isTextArea: true,
		name: "desc",
	},
	{
		title: "Beneficiary Address",
		placeholder: "Wallet address ",
		isTextArea: false,
		name: "address",
		isWallet: true,
	},
	{
		title: "Target amount (in XRP)",
		placeholder: "Amount needed for your project",
		isTextArea: false,
		name: "amount",
		type: "number",
	},
];
