import { Theme } from "@ghost/constants";
import { useAppConfig, useThemeMode } from "@ghost/hooks";
import { Container } from "@mui/material";
import Link from "next/link";
import { BsSun, BsFillMoonFill, BsGithub, BsFacebook, BsTwitter } from "react-icons/bs";
import { FaRss } from "react-icons/fa";

export const Navbar = () => {
	const { settings: appSetting } = useAppConfig();
	const { mode, toggleMode } = useThemeMode();
	const { navigation = [] } = appSetting;
	const githubUsername = process.env.GITHUB_USERNAME;

	return (
		<nav className="navbar navbar-fixed">
			<Container className="inner">
				<div className="navbar-left">
					<Link href="/" className="navbar-logo">
						{appSetting.title}
					</Link>
					{
						navigation.length > 0 && (
							<ul className="navbar-navigations">
								{
									navigation.map((page, index) => (
										<li
											key={index}
											role="menu"
										>
											<a href={page.url}>
												{page.label}
											</a>
										</li>
									))
								}
							</ul>
						)
					}
				</div>
				<div className="navbar-center">

				</div>
				<ul className="navbar-right">
					{
						false && (
							<li>
								<a onClick={() => toggleMode()}>
									{mode == Theme.Dark ? <BsFillMoonFill /> : <BsSun />}
								</a>
							</li>
						)
					}
					{
						githubUsername && <li>
							<a
								href={`https://github.com/${githubUsername}`}
								target="_blank"
							>
								<BsGithub />
							</a>
						</li>
					}
					{
						appSetting.facebook && (
							<li>
								<a
									href={`https://www.facebook.com/${appSetting.facebook}`}
									target="_blank"
								>
									<BsFacebook />
								</a>
							</li>
						)
					}
					{
						appSetting.twitter && (
							<li>
								<a
									href={`https://twitter.com/${appSetting.twitter}`}
									target="_blank"
								>
									<BsTwitter />
								</a>
							</li>
						)
					}
					<li>
						<a>
							<FaRss />
						</a>
					</li>
				</ul>
			</Container>
		</nav>
	);
};
