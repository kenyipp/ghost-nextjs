import { type DefaultSeoProps } from "next-seo";
import { type SettingsResponse } from "@tryghost/content-api";

export const getSeoConfigsFromSetting = (settings: SettingsResponse): DefaultSeoProps => {
	const {
		title,
		description,
		url,
		og_title: ogTitle,
		og_description: ogDescription
	} = settings;
	const config: DefaultSeoProps = {
		defaultTitle: `${title} - ${description}`,
		titleTemplate: `%s - ${title}`,
		description,
		canonical: url
	};
	if (ogTitle && ogDescription) {
		config.openGraph = {
			url,
			title: ogTitle,
			description: ogDescription
		};
	}
	return config;
};
