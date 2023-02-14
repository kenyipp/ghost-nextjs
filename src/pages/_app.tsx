import Head from "next/head";
import _ from "lodash";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { DefaultSeo } from "next-seo";
import { theme } from "@ghost/themes";
import { seoConfig } from "@ghost/constants";
import { useGhostClient } from "@ghost/hooks";
import { ThemeProvider, AppContext } from "@ghost/contexts";
import { getSeoConfigsFromSetting } from "@ghost/utils";
import { Layout } from "@ghost/components";
import { type AppSettingsProps } from "@ghost/types";
import { type AppProps } from "next/app";
import "@ghost/styles/globals.scss";

function App({ Component, pageProps, settings }: AppProps & AppSettingsProps) {
	const defaultSeoConfig = _.assign({}, getSeoConfigsFromSetting(settings), seoConfig);
	return (
		<>
			<Head>
				<link
					rel="icon"
					href={settings.icon}
					type="image/x-icon"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>
			</Head>
			<DefaultSeo {...defaultSeoConfig} />
			<MUIThemeProvider theme={theme}>
				<AppContext.Provider value={{ settings }}>
					<ThemeProvider>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</ThemeProvider>
				</AppContext.Provider>
			</MUIThemeProvider>
		</>
	);
};

App.getInitialProps = async function () {
	const client = useGhostClient();
	const settings = await client.settings.browse();
	return { settings };
};

export default App;


