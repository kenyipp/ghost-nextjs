import GhostContentAPI, { type GhostAPI } from "@tryghost/content-api";

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
