import { createContext, useState } from "react";
import { Theme } from "@ghost/constants";

export const ThemeContext = createContext({
	mode: Theme.Dark,
	toggleMode: () => { }
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	// const mode = getUserPreferredMode();
	const mode = Theme.Dark;
	const [theme, setTheme] = useState(mode);
	return (
		<ThemeContext.Provider
			value={{
				mode: theme,
				toggleMode: () => {
					setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
				}
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
