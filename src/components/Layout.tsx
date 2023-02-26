import { Navbar } from "@ghost/components/Navbar";
import { Footer } from "@ghost/components/Footer";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => (
	<>
		<Navbar />
		<main className="site-main">
			{children}
		</main>
		<Footer />
	</>
);
