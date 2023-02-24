import GhostContentAPI, { type GhostAPI } from "@tryghost/content-api";
import axios from "axios";

export const useGhostClient = (): GhostAPI => {
	const {
		GHOST_DOMAIN,
		GHOST_PUBLIC_API_KEY
	} = process.env;
	const client = new GhostContentAPI({
		url: GHOST_DOMAIN,
		key: GHOST_PUBLIC_API_KEY,
		version: "v5.0"
	});
	return client;
};

export const useAxiosClient = () => {
	const {
		GHOST_DOMAIN,
		GHOST_PUBLIC_API_KEY
	} = process.env;
	return axios
		.create({
			baseURL: `${GHOST_DOMAIN}/ghost/api/content`,
			params: {
				key: GHOST_PUBLIC_API_KEY
			}
		});
}

export const useNextClient = () => {
	const domain = process.env.NODE_ENV === "production"? process.env.SERVER_DOMAIN : "http://localhost:3000";
	return axios.create({ baseURL: `${domain}/api` });
};
