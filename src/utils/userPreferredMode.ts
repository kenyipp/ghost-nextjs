import { isServer } from "@ghost/utils/isServer";
import { Theme } from "@ghost/constants";

export const getUserPreferredMode = () => {
	if (isServer()) {
		return Theme.Dark;
	}
	try {
		const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
		return prefersDarkMode ? Theme.Dark : Theme.Light;
	} catch (error) {
		return Theme.Dark;
	}
};
