/** @type {import("next").NextConfig} */
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "s3-ca-central-1.amazonaws.com",
				port: "",
				pathname: "/kenyipp/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/",
			},
		],
	},
	poweredByHeader: false,
	reactStrictMode: false,
	swcMinify: true,
	env: {
		GHOST_DOMAIN: process.env.GHOST_DOMAIN,
		GHOST_PUBLIC_API_KEY: process.env.GHOST_PUBLIC_API_KEY,
		GITHUB_USERNAME: process.env.GITHUB_USERNAME,
		SERVER_DOMAIN: process.env.SERVER_DOMAIN
	},
	webpack(config) {
		config.plugins.push(
			new LodashModuleReplacementPlugin()
		);
		return config;
	}
}

module.exports = nextConfig;
