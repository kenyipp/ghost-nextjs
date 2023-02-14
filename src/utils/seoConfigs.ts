import { type DefaultSeoProps } from "next-seo";
import { type SettingsResponse } from "@tryghost/content-api";

export const getSeoConfigsFromSetting = (settings: SettingsResponse): DefaultSeoProps => {
	const config: DefaultSeoProps = {
		defaultTitle: settings.title,
		titleTemplate: `%s - ${settings.title}`,
		description: settings.description,
		canonical: settings.url,
	};
	if (settings.og_title && settings.og_description) {
		config.openGraph = {
			url: settings.url,
			title: settings.og_title,
			description: settings.og_description
		};
	}
	return config;
};
