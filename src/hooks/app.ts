import { useContext } from "react";
import { AppContext } from "@ghost/contexts";

export const useAppConfig = () => {
	const context = useContext(AppContext);
	return context;
};
