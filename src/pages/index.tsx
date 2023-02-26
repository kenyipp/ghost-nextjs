import { ArticlePreview, Pagination } from "@ghost/components";
import { useGhostClient } from "@ghost/hooks";
import { Grid } from "@mui/material";
import { type GetServerSideProps } from "next";
import { type Pagination as PaginationProps, type PostsOrPages } from "@tryghost/content-api";
import { getGridSize } from "@ghost/utils";

const Home = ({
	posts,
	pagination
}: HomeProps) => (
	<Grid
		container
		maxWidth="lg"
		margin="2rem auto"
	>
		{
			posts.map((post, index) => {
				const size = getGridSize(index);
				return (
					<Grid
						key={index}
						item
						lg={size.lg}
						md={size.md}
						sm={size.sm}
						xs={size.xs}
					>
						<ArticlePreview
							post={post}
							horizontal={index === 0}
						/>
					</Grid>
				);
			})
		}
		<Grid
			item
			xs={12}
		>
			<Pagination pagination={pagination} />
		</Grid>
	</Grid>
);

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const client = useGhostClient();
	const page = (typeof context.query.page === "string" && Number(context.query.page)) || 0;
	const posts = await client.posts.browse({
		limit: 9,
		page,
		include: ["tags", "authors"]
	});
	return {
		props: {
			posts,
			pagination: posts.meta.pagination
		}
	};
};

interface HomeProps {
	posts: PostsOrPages,
	pagination: PaginationProps
}
