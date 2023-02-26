import {
	Html, Head, Main, NextScript
} from "next/document";
import { Theme } from "@ghost/constants";
import { useThemeMode } from "@ghost/hooks";

export default function Document() {
	const { mode } = useThemeMode();
	return (
		<Html lang="en">
			<Head>
				<meta charSet="UTF-8" />
				<meta
					httpEquiv="X-UA-Compatible"
					content="IE=edge"
				/>
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
				/>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
					rel="stylesheet"
				/>
				<link
					rel="stylesheet"
					media={mode === Theme.Dark ? "all" : "not all"}
					disable={mode === Theme.Light}
					href="/stylesheets/dark.css"
				/>
				<link
					rel="stylesheet"
					href="/stylesheets/light.css"
					media={mode === Theme.Light ? "all" : "not all"}
					disable={mode === Theme.Dark}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
