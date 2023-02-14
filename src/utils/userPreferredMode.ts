import { isServer } from "@ghost/utils";
import { Theme } from "@ghost/constants";

export const getUserPreferredMode = () => {
	if (isServer()) {
		return Theme.Dark;
	}
	try {
		const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
		return prefersDarkMode ? Theme.Dark : Theme.Light;
	} catch (error) {
		console.error(error);
		return Theme.Dark;
	}
};
