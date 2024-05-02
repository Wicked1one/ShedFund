import { toast } from "react-toastify";
import { Api } from "./api/api";
import { pageWalletBalance, walletBalance } from "./store";

export async function fetchWalletBalance(
	address: string,
	setIsBalanceIsLoading: any,

	showToast: boolean
) {
	setIsBalanceIsLoading(true);
	Api.handlePost(
		"/getBalance",
		{ address: address },
		{ ContentType: "application/x-www-form-urlencoded" }
	)
		.then((response) => {
			setIsBalanceIsLoading(false);
			console.log(response.payload.balance[0].value);
			!showToast
				? walletBalance.setState({
						walletBalance: response.payload.balance[0].value,
				  })
				: pageWalletBalance.setState({
						walletBalance: response.payload.balance[0].value,
				  });
		})
		.catch((error) => {
			setIsBalanceIsLoading(false);
			console.log(error);
		});
}
