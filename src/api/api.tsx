import axios from "axios";
import { toast } from "react-toastify";

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
	static async handlePost(path: string, payload: {}, encoding: {}) {
		console.log(path);
		try {
			const response = await axios.post(this.baseUrl + path, payload, {
				headers: encoding,
			});
			console.log(response);
			return response.data;
		} catch (e) {
			console.log(e);
			return e;
		}
	}

	static handleFieldCheck(obj: {}) {
		// Iterate over the values of the object
		for (const field of Object.values(obj)) {
			// Check if the field is falsy (empty, null, undefined, etc.)
			if (!field) {
				// If any field is empty, return false immediately
				toast.error("Some required fields are empty");
				return false;
			}
		}
		// If all fields are filled, return true

		return true;
	}
}
