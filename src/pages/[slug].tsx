import { Grid } from "@mui/material";
import { Article, RelevantArticles } from "@ghost/components";
import { useAxiosClient, useNextClient } from "@ghost/hooks";
import { type PostOrPage } from "@tryghost/content-api";
import { type GetServerSideProps } from "next";
import { type RelevantPostResponse, type RelevantPost } from "@ghost/types";

const ArticleDetail = ({ post, relevant }: ArticleDetailProps) => {
	return (
		<>
			<Grid
				container
				maxWidth="md"
				margin="2rem auto"
			>
				<Article post={post} />
			</Grid>
			<hr />
			<Grid
				container
				maxWidth="lg"
				margin="2rem auto"
			>
				<RelevantArticles {...relevant} />
			</Grid>
		</>

	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const nextClient = useNextClient();
	const axiosClient = useAxiosClient();

	const slug = (typeof context.params?.slug === "string" && context.params?.slug) || "";

	const post: PostOrPage = await axiosClient
		.get("/posts", {
			params: {
				slug,
				include: ["tags", "authors"],
				limit: 1
			}
		})
		.then(response => response.data.posts[0]);

	const relevantResponse = await nextClient
		.get<RelevantPostResponse>(`/post/slug/${slug}/relevant`)
		.then(response => response.data.data);

	return {
		props: {
			post,
			relevant: relevantResponse
		}
	};
};

interface ArticleDetailProps {
	post: PostOrPage,
	relevant: RelevantPost
}

export default ArticleDetail;
