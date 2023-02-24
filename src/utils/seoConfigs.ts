import { type DefaultSeoProps } from "next-seo";
import { type SettingsResponse } from "@tryghost/content-api";

export const getSeoConfigsFromSetting = (settings: SettingsResponse): DefaultSeoProps => {
	const {
		title,
		description,
		url,
		og_title,
		og_description
	} = settings;
	const config: DefaultSeoProps = {
		defaultTitle: `${title} - ${description}`,
		titleTemplate: `%s - ${title}`,
		description: description,
		canonical: url,
	};
	if (og_title && og_description) {
		config.openGraph = {
			url: url,
			title: og_title,
			description: og_description
		};
	}
	return config;
};
