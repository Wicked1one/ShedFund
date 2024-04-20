import axios from "axios";

export class Api {
	static baseUrl = "https://shed-funding-server.onrender.com";

	static async handleFetch(path: string) {
		try {
			const response = await axios.get(this.baseUrl + path);
			return response.data;
		} catch (e) {
			return e;
		}
	}
}
