import { useAppConfig } from "@ghost/hooks";

export const Header = () => {
	const { settings } = useAppConfig();
	return (
		<header
			className="site-header"
			style={{ backgroundImage: `url(${settings.cover_image})` }}
		>
			<div className="site-header-content">
				<h1 className="site-header-title">{settings.title}</h1>
				<h2 className="site-header-description">{settings.description}</h2>
			</div>
		</header>
	)
};
