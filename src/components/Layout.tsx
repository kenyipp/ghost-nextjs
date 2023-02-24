import Head from "next/head";
import { Theme } from "@ghost/constants";
import { Navbar, Footer } from "@ghost/components";
import { useThemeMode } from "@ghost/hooks";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
	const { mode } = useThemeMode();
	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					type="text/css"
					media={mode == Theme.Dark ? "all" : "not all"}
					disable={mode == Theme.Light}
					href="/stylesheets/dark.css"
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href="/stylesheets/light.css"
					media={mode == Theme.Light ? "all" : "not all"}
					disable={mode == Theme.Dark}
				/>
			</Head>
			<Navbar />
			<main className="site-main">
				{children}
			</main>
			<Footer />
		</>
	)
};
