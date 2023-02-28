import { Grid } from "@mui/material";
import { Article } from "@ghost/components";
import { useNextClient } from "@ghost/hooks";
import { type PostOrPage } from "@tryghost/content-api";
import { type GetServerSideProps } from "next";

const ArticlePreview = ({ post }: PreviewArticleProps) => (
	<Grid
		container
		maxWidth="md"
		margin="2rem auto"
	>
		<Article post={post} />
	</Grid>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
	const nextClient = useNextClient();
	const id = context.params?.id || "" as string;
	const post = await nextClient
		.get<{ data: PostOrPage }>(`/post/${id}`)
		.then((response) => response.data.data);
	return { props: { post } };
};

interface PreviewArticleProps {
	post: PostOrPage
}

export default ArticlePreview;
