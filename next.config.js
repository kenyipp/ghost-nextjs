/** @type {import("next").NextConfig} */
const _ = require("lodash");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const nextConfig = {
	distDir: process.env.NODE_ENV === "production" ? "build" : undefined,
	poweredByHeader: false,
	reactStrictMode: false,
	swcMinify: true,
	env: {
		GHOST_DOMAIN: process.env.GHOST_DOMAIN,
		GHOST_PUBLIC_API_KEY: process.env.GHOST_PUBLIC_API_KEY
	},
	webpack(config) {
		config.plugins.push(
			new LodashModuleReplacementPlugin()
		);
		return config;
	}
}

module.exports = nextConfig;
