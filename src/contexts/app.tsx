import { createContext } from "react";
import { SettingsResponse } from "@tryghost/content-api";

interface AppContextProps {
	settings: SettingsResponse
}

export const AppContext = createContext<AppContextProps>({
	settings: { meta: {} }
});
