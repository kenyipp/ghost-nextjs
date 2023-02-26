import type { NextPage, NextPageContext } from "next";

interface Props {
	statusCode?: number
}

const Error: NextPage<Props> = ({ statusCode }) => (
	<div className="error-container">
		<p>{statusCode ? `An error ${statusCode} occurred on server` : "Application error: a client-side exception has occurred (see the browser console for more information)"}</p>
	</div>
);

Error.getInitialProps = ({ res, err }: NextPageContext) => {
	const statusCode = res ? res.statusCode : (err?.statusCode || 404);
	return { statusCode };
};

export default Error;
