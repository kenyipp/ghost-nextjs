import { Container } from "@mui/material";
import moment from "moment";
import { useAppConfig } from "@ghost/hooks";
import Link from "next/link";

export const Footer = () => {
	const { settings: appSetting } = useAppConfig();
	const githubUsername = process.env.GITHUB_USERNAME;
	const year = moment().format("YYYY");
	return (
		<footer className="site-footer">
			<Container className="inner">
				<section className="copyright">
					<Link href="/">{appSetting.title}</Link>
					<span>©</span>
					<span>{year}</span>
				</section>
				<ul className="site-footer-nav">
					<li>
						<Link href="/">
							Latest Post
						</Link>
					</li>
					<li>
						<Link
							href={`https://github.com/${githubUsername}`}
							target="_blank"
						>
							GitHub
						</Link>
					</li>
					<li>
						<Link
							href={`https://www.facebook.com/${appSetting.facebook}`}
							target="_blank"
						>
							Facebook
						</Link>
					</li>
					<li>
						<Link
							href={`https://twitter.com/${appSetting.twitter}`}
							target="_blank"
						>
							Twitter
						</Link>
					</li>
				</ul>
			</Container>
		</footer>
	);
};
