import { useContext } from "react";
import { ThemeContext } from "@ghost/contexts";

export const useThemeMode = () => {
	const context = useContext(ThemeContext);
	return context;
};
