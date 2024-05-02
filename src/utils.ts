import { toast } from "react-toastify";
import { Api } from "./api/api";

export function fetchWalletBalance(
	address: string,
	setIsBalanceIsLoading: any,
	setBalance: any
) {
	setIsBalanceIsLoading(true);
	Api.handlePost(
		"/getBalance",
		{ address: address },
		{ ContentType: "application/x-www-form-urlencoded" }
	)
		.then((response) => {
			setBalance(response.payload.balance[0].value);
			setIsBalanceIsLoading(false);
			return response.payload.balance[0].value;
		})
		.catch((error) => {
			setIsBalanceIsLoading(false);
			console.log(error);
			toast.error("There was an error fetching walletbalance");
		});
}
